import React from "react"
import styled from "styled-components"

const StForm = styled.form`
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  font-size: 24px;
  /* display: grid;
  grid-template-areas:
    "info info"
    "title genre"
    "body body"
    "link link"
    "author btn"; */
  width: 800px;
  height: 600px;
  grid-auto-columns: 600px 100px;
  grid-auto-rows: 50px 50px 200px 50px 50px;
  justify-content: center;
  gap : 30px;
  box-shadow: 12px 12px 2px 1px ${({ theme }) => theme.azur.light};
`

const FormWrap = (props) => {
  return (
    <StForm onSubmit={props.onSubmit}>
      {props.children}
    </StForm>
  )
}

export default FormWrap;