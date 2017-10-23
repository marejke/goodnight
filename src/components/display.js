import React from 'react'
import styled, { keyframes, css } from 'styled-components'

const blinkAnimation = keyframes`
from {
  opacity: 0.5;
}
50% {
   opacity: 1;
}
to {
  opacity: 0.5;
}`

const Number = styled.span`
${props => props.active && css`
animation: ${blinkAnimation} 1s linear infinite;
`}
`

export default function Display (props) {
  const {
    hours,
    minutes,
    seconds
  } = props.time

  return (
    <div>
      <Number active={props.active === 'hours'}>{hours}</Number>:
      <Number active={props.active === 'minutes'}>{minutes}</Number>:
      <Number active={props.active === 'seconds'}>{seconds}</Number></div>
  )
}

Display.propTypes = {
  time: React.PropTypes.object,
  active: React.PropTypes.string
}
