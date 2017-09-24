import React from 'react'

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
  time: React.PropTypes.number
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
      active: 'hours'
    }
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
  shutdown () {
    const { time } = this.state
    const { hours, minutes, seconds } = time
    const total = hours * 60 * 60 + minutes * 60 + seconds
    alert(`time left: ${total} seconds`)
  }
  render () {
    this.letzteZeit = Date.now()

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
          {numberButtons}
        </div>
        <div>
          <button onClick={() => this.previous()}>&lt;</button>
          <button onClick={() => this.next()}>&gt;</button>
          <button onClick={() => this.shutdown()}>Start</button>
        </div>
      </div>
    )
  }
}
