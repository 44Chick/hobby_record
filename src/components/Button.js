import React from "react"
import styled from "styled-components"

const StButton = styled.button`
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.azur.deep};
  color: white;
  /* width: fit-content;
  height: fit-content; */
  margin-right: 5px;
  font-size: medium;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${({ theme }) => theme.azur.deep};
  }
`

const Button = (props) => {
  return (
    <StButton className={props.className} onClick={props.onClick}>
      {props.children}
    </StButton>
  )
}

export default Button
