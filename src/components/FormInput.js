import React from "react"
import styled from "styled-components"

const FormInput = (props) => {
  return (
    <StFormInput
      type="text"
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  )
}

export default FormInput

const StFormInput = styled.input`
  width: 80%;
  height: 30px;
  border: 2px solid #ccc;
  border-radius: 5px;
`
