import React from 'react'

export default function Display (props) {
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
