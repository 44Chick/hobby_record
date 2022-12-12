import React from "react"
import styled from "styled-components"

const Button = (props) => {
  return (
    <StButton type="button" onClick={props.onClick}>
      {props.children}
    </StButton>
  )
}

export default Button

const StButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  cursor: pointer;
`
