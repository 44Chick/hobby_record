import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { __getcontents, delContent} from "../redux/modules/contentsSlice";

import styled from "styled-components";

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, contents } = useSelector((state) => state.contents);

  const delHandler = (del_id) =>{
    dispatch(delContent(del_id));
  }

  useEffect(() => {
    dispatch(__getcontents());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <CardsBox>
      {contents?.map((content) => (
        <Cards key={content.id}>
        <Link to={`/detail/${content.id}`}>
        <h3>{content.content_title}</h3>
        </Link>
          <div>{content.content_body}</div>
          <a href={content.content_link}>Link</a>
          <div>{content.content_date}</div>
          <button onClick={() => delHandler(content.id)}>Delete</button>
        </Cards>
      ))}
    </CardsBox>
  );
};

export default List;

const themeColor = [
  'rgba(100, 225, 255, 0.8)',
  'rgba(50, 225, 50)',
  'rgba(255, 50, 50)',
  'rgba(255, 225, 100, 0.8)',
]

const CardsBox = styled.div`
  height: 600px;
  width: auto;
  display: flex;
  gap: 20px;
  /* overflow: auto; */
  flex-wrap: wrap;
  overflow: auto;
  white-space:nowrap;
  grid-template-columns: 1fr 1fr 1fr;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const Cards = styled.div`
  box-shadow: 0px 0px 15px 15px ${themeColor[0]};
  min-width: 320px;
  max-width: 320px;
  height: 200px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px; 
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 20px;
`;

const BtnSet = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap: 20px;
`;

const StBtn = styled.button`
  font-weight:bold;
  border-radius: 10px;
  border: 0.5px solid ${(props) => props.mainColor};
  background: linear-gradient(180deg, black 75%, ${(props) => props.mainColor} );
  font-size: 14px;
  width: 120px;
  height: 40px;
  color: white;
  cursor: pointer;
  &:hover{
    color: white;
    background: linear-gradient(180deg, black -50%, ${(props) => props.mainColor} );
    text-shadow: -5px 0px 5px white, 5px 0px 5px white;
    border: 2px solid ${(props) => props.mainColor};
  }
`;