import styled, { keyframes, css } from 'styled-components'

const colors = {
  font: '#fff'
}

const bgAnimation = keyframes`
from {
  background: #7dd8ff;
}

20% {
  background: #ffdf8f;
}

40% {
  background: #ffb046;
}

60% {
  background: #ff6881;
}

80% {
  background: #2875bd;
}

to {
  background: #0d044e;
}
`

export const Wrapper = styled.div`
position: fixed;
left: 0;
right: 0;
top: 0;
bottom: 0;
padding: 2rem;
background: #7dd8ff;
text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.19);
${props => props.animationDuration && css`
animation: ${bgAnimation} ${(props) => props.animationDuration}s linear 1;
`}
`

export const Button = styled.button`
border-radius: 3px;
padding: 0.25em 1em;
margin: 0.5em 1em;
background: rgba(86, 86, 86, 0.05);
box-shadow: 1px 1px 1px rgba(0,0,0,0.19);
color: ${colors.font};
border: 2px solid ${colors.font};
outline: none;
`

export const Controls = styled.div`
display: flex;
justify-content: center;
`

export const NumberButton = styled.button`
border-radius: 3px;
padding: 0.25em 1em;
margin: 0.5em 1em;
background: rgba(86, 86, 86, 0.05);
box-shadow: 1px 1px 1px rgba(0,0,0,0.19);
color: ${colors.font};
border: 2px solid ${colors.font};
outline: none;
`

export const Numberpad = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`

export const TimeInputDisplay = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
color: ${colors.font};
`

export const TimeDisplay = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
color: ${colors.font};
padding-top: 1em;
font-size: 3em;
`
