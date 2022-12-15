import React from "react"
import styled from "styled-components"

const StInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid;
`

const Input = (props) => {
  return (
    <StInput 
      required={props.required}
      placeholder={props.placeholder}
      type="text" 
      className={props.className} 
      onChange={props.onChange}>
      {props.children}
    </StInput>
  )
}

export default Input;