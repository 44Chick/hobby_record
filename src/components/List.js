import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { __getcontents, delContent } from "../redux/modules/contentsSlice";

import styled from "styled-components";

import theme from "../styles/theme"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleQuestion,
  faBookOpenReader,
  faHeadphonesSimple,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

const icName = {
  etc: faCircleQuestion,
  book: faBookOpenReader,
  album: faHeadphonesSimple,
  movie: faFilm,
}
const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, contents } = useSelector((state) => state.contents);

  const delHandler = (del_id, event) => {
    event.stopPropagation()
    if (!window.confirm("삭제하시겠습니까?")) {
      // 취소(아니오) 버튼 클릭 시 이벤트
      return
    } else {
      // 확인(예) 버튼 클릭 시 이벤트
      dispatch(delContent(del_id));
    }
  }

  const linkHandler = (link, event) =>{
    event.stopPropagation();
    window.location.href = link; 
  }

  useEffect(() => {
    dispatch(__getcontents());
  }, [dispatch]);

  if (isLoading) {
    return <div style={{textAlign:"center"}}>Loading....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <CardsBox>
      {contents?.map((content) => (
        <Cards key={content.id} onClick={() => {
          navigate(`detail/${content.id}`)
        }}>
          <DelBox>
            <DelBtn onClick={(event) => delHandler(content.id, event)} icon={faXmark} />
          </DelBox>
          <AweIcon icon={icName[`${content.content_genre}`]} />
          <h3>{content.content_title}</h3>
          <CardsBody>{content.content_body}</CardsBody>
          <div>{content.content_author}</div>
          <CardsLink onClick={(event)=>{linkHandler(content.content_link, event)}}>{content.content_link}</CardsLink>
          <div>{content.content_date}</div>
          <CardsBtn>READ MORE</CardsBtn>
        </Cards>
      ))}
    </CardsBox>
  );
};

export default List;

const CardsBox = styled.div`
  height: 600px;
  width: auto;
  display: flex;
  gap: 20px;
  /* overflow: auto; */
  flex-wrap: wrap;
  overflow: auto;
  grid-template-columns: 1fr 1fr 1fr;
`;

const CardsLink = styled.div`
  height: 14px;
  width: auto;
  white-space:nowrap;
  text-overflow: ellipsis;
`

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const DelBox = styled.div`
  display: flex;
  justify-content: right;
`

const DelBtn = styled(FontAwesomeIcon)`
  height: 25px;
  text-align: right;
  color: inherit;
`

const Cards = styled.div`
  text-align: center;
  min-width: 320px;
  max-width: 320px;
  height: 500px;
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px; 
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 20px;
  color: black;
  box-shadow: 12px 12px 2px 1px ${({ theme }) => theme.azur.light};
  &:hover{
    background-color: ${({ theme }) => theme.azur.deep};
    color: white;
  }
`;

const CardsBody = styled.div`
  height: 200px;

  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;

`

const AweIcon = styled(FontAwesomeIcon)`
  color : inherit;
  height: 50px;

`
const CardsBtn = styled.button`
  height: 50px;
  width: 200px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.azur.deep};
  color: white;
  border: none;

  ${Cards}:hover & {
    background: white;
    color: ${({ theme }) => theme.azur.deep};
  }
`