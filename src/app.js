import React from 'react'
import moment from 'moment'
import execa from 'execa'
import {
  Wrapper, Button, Controls, NumberButton, Numberpad, TimeInputDisplay, TimeDisplay
} from './styles.js'
import Display from './components/display.js'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      active: 'hours',
      timeLeft: 0,
      shutdownTime: null
    }

    this.startShutdown = this.startShutdown.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.reset = this.reset.bind(this)
    this.updateCountdown = this.updateCountdown.bind(this)

    document.addEventListener('keyup', (e) => {
      console.log(e)

      if (event.key === 'ArrowRight') {
        this.next()
      }
      if (event.key === 'ArrowLeft') {
        this.previous()
      }
      if (event.code.includes('Digit')) {
        this.addTime(parseInt(event.key))
      }
      if (event.key === 'Enter') {
        this.startShutdown()
      }
    })
  }

  addTime (newTime) {
    const {
      time,
      active
    } = this.state

    time[active] = time[active] * 10 + newTime

    this.setState({
      time: time
    })
  }

  next () {
    const { active } = this.state
    if (active === 'hours') {
      return this.setState({
        active: 'minutes'
      })
    }

    if (active === 'minutes') {
      return this.setState({
        active: 'seconds'
      })
    }
  }

  previous () {
    const { active } = this.state
    if (active === 'minutes') {
      return this.setState({
        active: 'hours'
      })
    }

    if (active === 'seconds') {
      return this.setState({
        active: 'minutes'
      })
    }
  }

  reset () {
    this.setState({
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      active: 'hours',
      timeLeft: '',
      shutdownTime: null,
      totalSeconds: 0
    })
  }

  startShutdown () {
    const { time } = this.state
    const { hours, minutes, seconds } = time
    const total = hours * 60 * 60 + minutes * 60 + seconds
    const shutdownTime = moment().add(total, 'seconds')

    this.setState({
      shutdownTime,
      totalSeconds: total
    })

    console.log(`shutdown in ${total} seconds`)
    window.requestAnimationFrame(this.updateCountdown)
  }

  updateCountdown () {
    if (!this.state.shutdownTime) {
      return
    }
    const duration = moment.duration(this.state.shutdownTime.diff(moment()))
    const timeLeft = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`

    if (this.state.timeLeft !== timeLeft) {
      this.setState({
        timeLeft
      })

      console.log(`time left: ${timeLeft}`)
    }

    if (this.state.shutdownTime.isAfter(moment())) {
      return window.requestAnimationFrame(this.updateCountdown)
    }

    execa('pmset', ['sleepnow'], (result) => {
      if (result.stderr) {
        alert('An error occurred while sleeping the mac')
      }
    })
  }
  render () {
    const numberButtons = [...Array(10).keys()]
      .map((index) => (
        <NumberButton key={index} onClick={() => this.addTime(index)}>{index}</NumberButton>
      ))

    return (
      <div>
        <Wrapper animationDuration={this.state.totalSeconds}>
          <TimeInputDisplay>
            <Display active={this.state.active} time={this.state.time} />
          </TimeInputDisplay>
          <div>
            <Numberpad>
              {numberButtons}
            </Numberpad>
          </div>
          <Controls>
            <Button onClick={this.previous}>&lt;</Button>
            <Button onClick={this.next}>&gt;</Button>
          </Controls>
          <Controls>
            <Button onClick={this.startShutdown}>Start</Button>
            <Button onClick={this.reset}>Reset</Button>
          </Controls>
          <div>
            <TimeDisplay>
              {this.state.timeLeft}
            </TimeDisplay>
          </div>
        </Wrapper>
      </div>
    )
  }
}
