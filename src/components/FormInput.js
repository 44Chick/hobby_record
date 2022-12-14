import React from "react"
import styled from "styled-components"

const StFormInput = styled.input`
  width: 50%;
  height: 40px;
  ${({ theme }) => theme.common.inputs}
`
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
