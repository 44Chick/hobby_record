import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addcontents } from "../redux/modules/contentsSlice";

import styled from "styled-components";
import theme from "../styles/theme"

import Button from "./Button";
import Input from "./Input";

import "./PostForm.css"

function getFormatDate() {
  const date = new Date();
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function PostForm() {
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();
  const { error, msg } = useSelector((state) => state.contents)
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    content_title: "",
    content_body: "",
    content_author: "",
    content_genre: "장르",
    content_link: "",
    content_date: "",
  });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const onAddHandler = async (e) => {
    e.preventDefault();
    if (content.content_title.trim() === ""
      || content.content_body.trim() === "") {
      alert("공백을 체워주세요")
      return
    }
    if (content.content_author.trim() === "") {
      content.content_author = "아무개"
    }
    // if(!window.confirm("추가 하겠습니까?")){
    //   return 
    // } else {
    // }
    content.content_date = getFormatDate();
    await dispatch(__addcontents({ ...content }));
    setClick(true);
    // console.log(msg)
    // navigate("/")
  };

  useEffect(() => {
    if (!isClick) return;
    if (msg === "success" && isClick) {
      navigate("/")
    }
    alert(msg)
  }, [msg, isClick])
  // onClick={() => {
  //   if (!window.confirm("삭제하시겠습니까?")) {
  //     // 취소(아니오) 버튼 클릭 시 이벤트
  //     return
  //   } else {
  //     // 확인(예) 버튼 클릭 시 이벤트
  //     setContent(null)
  //     dispatch(delContent(pageId))
  //     // onClickDelete(pageId)
  //     // fetchActualDetail()
  //     navigate("/") // 리렌더 안 됨
  //   }
  // }}


  return (
      <FormBox method="post" onSubmit={onAddHandler}>
        <FormInfo>추천글 작성</FormInfo>
        <StTitle
          required
          type="text"
          name="content_title"
          value={content.content_title}
          maxLength="15"
          onChange={changeInput}
          placeholder="제목 입력"
        ></StTitle>
        <StGenre
          name="content_genre"
          required
          onChange={changeInput}
          value={content.content_genre}
        >
          <option value="" hidden>
            장르
          </option>
          <option value="book">도서</option>
          <option value="movie">영화</option>
          <option value="album">음악</option>
          <option value="etc">기타</option>
        </StGenre>
        <StBody
          required
          name="content_body"
          value={content.content_body}
          onChange={changeInput}
          placeholder="내용 입력"
        ></StBody>
        <StAuthor
          type="text"
          name="content_author"
          value={content.content_author}
          onChange={changeInput}
          placeholder="당신 이름"
        ></StAuthor>
        <StLink
          type="text"
          name="content_link"
          value={content.content_link}
          onChange={changeInput}
          placeholder="추천 링크"
        ></StLink>
        <StBtn onSubmit={onAddHandler}>확인</StBtn>
      </FormBox>
  );
}

export default PostForm;

const FormBox = styled.form`
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  font-size: 24px;
  display: grid;
  grid-template-areas:
    "info info"
    "title genre"
    "body body"
    "link link"
    "author btn";
  width: 800px;
  height: 600px;
  grid-auto-columns: 600px 100px;
  grid-auto-rows: 50px 50px 200px 50px 50px;
  justify-content: center;
  gap : 30px;
`
const FormInfo = styled.div`
  grid-area: info;
  text-align: center;
`

const StTitle = styled(Input)`
  grid-area: title;
`
const StGenre = styled.select`
  grid-area: genre;
`
const StBody = styled.textarea`
  padding: 10px;
  grid-area: body;
`
const StLink = styled(Input)`
  grid-area: link;
`
const StAuthor = styled(Input)`
  grid-area: author;
`
const StBtn = styled(Button)`
  grid-area: btn;

  /* border-radius: 50px;
  background-color: ${({ theme }) => theme.azur.deep};
  color: white;
  border: none;
  &:hover{
    background: ${({ theme }) => theme.azur.light};
    color: ${({ theme }) => theme.azur.deep};
  } */
`

// height: 50px;
// width: 200px;
// border-radius: 50px;
// background-color: ${({ theme }) => theme.azur.deep};
// color: white;
// border: none;
// ${Cards}:hover & {
//   background: white;
//   color: ${({ theme }) => theme.azur.deep};
// }
