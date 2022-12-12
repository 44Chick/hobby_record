import React from "react";
import { Link } from "react-router-dom";
import List from "../components/List";

import styled from "styled-components";

function Home(){
  return(
    <HomeWrap>
      <h1>Home</h1>
      <Link to="/posting"><CreateBtn>Create</CreateBtn></Link>
      <List />
    </HomeWrap>
  )
}

export default Home;

const HomeWrap = styled.div`
  width: 1200px;
  height: 800px;
  margin: auto;
`

const CreateBtn = styled.button`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: solid 5px aqua;
  background-color: white;
`