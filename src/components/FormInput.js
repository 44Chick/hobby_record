import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"

const StFormInput = styled.input`
  width: 50%;
  ${({ theme }) => theme.common.inputs}
`

const FormInput = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StFormInput
        type="text"
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </ThemeProvider>
  )
}

export default FormInput
