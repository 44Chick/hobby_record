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
      name={props.name}
      required={props.required}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      type="text"
      maxLength={props.maxLength}
      className={props.className} 
      onChange={props.onChange}>
      {props.children}
    </StInput>
  )
}

export default Input;