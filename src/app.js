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
  last () {
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
          <button onClick={() => this.last()}>&lt;</button>
          <button onClick={() => this.next()}>&gt;</button>
          <button>Start</button>
        </div>
      </div>
    )
  }
}
