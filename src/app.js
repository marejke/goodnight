import React from 'react'
import moment from 'moment'

function Display (props) {
  const {
    hours,
    minutes,
    seconds
  } = props.time

  return (
    <div>{hours}:{minutes}:{seconds}</div>
  )
}

Display.propTypes = {
  time: React.PropTypes.object
}

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
      shutdownTime: null
    })
  }

  startShutdown () {
    const { time } = this.state
    const { hours, minutes, seconds } = time
    const total = hours * 60 * 60 + minutes * 60 + seconds
    const shutdownTime = moment().add(total, 'seconds')

    this.setState({
      shutdownTime
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
      window.requestAnimationFrame(this.updateCountdown)
    }
  }
  render () {
    const numberButtons = [...Array(10).keys()]
      .map((index) => (
        <div key={index}>
          <button onClick={() => this.addTime(index)}>{index}</button>
        </div>
      ))

    return (
      <div>
        <Display time={this.state.time} />
        <div>
          {process.platform}
          {numberButtons}
        </div>
        <div>
          <button onClick={this.previous}>&lt;</button>
          <button onClick={this.next}>&gt;</button>
          <button onClick={this.startShutdown}>Start</button>
          <button onClick={this.reset}>Reset</button>
        </div>
        <div>
          {this.state.timeLeft}
        </div>
      </div>
    )
  }
}
