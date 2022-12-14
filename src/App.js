import React from "react"
import Router from "./shared/Router"
import GlobalStyle from "./styles/GlobalStyles"
import { ThemeProvider } from "styled-components"

function App() {
  const theme = {
    primaryColor: "#7F7FD5",
    secondaryColor: "#86A8E7",
    tertiaryColor: "#91EAE4",
  }
  return (
    <>
      <ThemeProvider theme={theme} />
      <GlobalStyle />
      <Router />
    </>
  )
}

export default App
