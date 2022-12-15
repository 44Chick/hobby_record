import React from "react";
import PostForm from "../components/PostForm";

import styled from "styled-components";
import theme from "../styles/theme";

function Posting(){
  return(
    <PostBody>
      <h1>Posting</h1>
      <PostForm />
    </PostBody>
  )
}

export default Posting;

const PostBody = styled.div`
`