import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import logo from "../img/HR_logo.png"

import Button from "../components/Button";

function Header() {
  return (
    <HeadTitle>
      <Link 
      style={{display:"flex", alignItems: "center"}}
      to='/'>
      <LogoImg src={logo}></LogoImg>
      </Link>
      <Link to="/posting"><CreateBtn>Create</CreateBtn></Link>
    </HeadTitle>
  )
}
function Footer() {
  return (
    <div>
    </div>
  )
}
function Layout({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout;

const HeadTitle = styled.div`
  width: 1200px;
  height: 75px;
  overflow: hidden;
  padding: 5px;
  margin: auto;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  text-align: center;
  align-content: center;
  background-size: cover;
  width: 200px;
`
const CreateBtn = styled(Button)`
  height: 50px;
  width: 100px;
  /* border-radius: 10px;
  border: solid 5px aqua;
  background-color: white; */
`