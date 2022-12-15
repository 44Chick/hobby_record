import React from "react";
import List from "../components/List";

import styled from "styled-components";

function Home(){
  return(
    <HomeWrap>
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
