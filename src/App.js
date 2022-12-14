import React from "react"
import Router from "./shared/Router"
import GlobalStyle from "./styles/GlobalStyles"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
