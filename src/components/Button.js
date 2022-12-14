import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"

const StButton = styled.button`
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.azur.deep};
  color: white;
  width: fit-content;
  height: fit-content;
  margin-right: 5px;
  font-size: medium;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${({ theme }) => theme.azur.deep};
  }
`
StButton.defaultProps = {
  theme: {
    main: "#7F7FD5",
  },
}

const Button = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StButton
        type="button"
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </StButton>
    </ThemeProvider>
  )
}

export default Button
