import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import {
  __getcontents,
  updateContent,
  __delcontent,
} from "../redux/modules/contentsSlice"
import { DB } from "../redux/modules/contentsSlice"
import Button from "../components/Button"
import ReplyForm from "../components/ReplyForm"
import FormInput from "../components/FormInput"

import FormWrap from "../components/FormWrap"

import Input from "../components/Input"

function Detail() {
  // 상세페이지 보기 상태(true)인지 수정 상태(false)인지 결정
  const [renderStatus, setRenderStatus] = useState(true)
  const [content, setContent] = useState({
    id: 0,
    content_title: "",
    content_body: "",
    content_link: "",
    content_author: "",
    content_date: "",
  })
  const dispatch = useDispatch()
  const { contents, isLoading, error } = useSelector((state) => state.contents)
  const param = useParams()
  const navigate = useNavigate()
  const pageId = parseInt(param.id)

  const fetchActualDetail = async () => {
    const { data } = await axios.get(`${DB}/contents/${pageId}`)
    setContent(data)
  }

  const detailContent = contents?.find((ctt) => ctt.id === pageId)

  const onClickEditButton = async (contentId, edit) => {
    await axios.patch(`${DB}/contents/${contentId}`, edit)
    fetchActualDetail()
  }

  const onClickDelete = async (contentId) => {
    await axios.delete(`${DB}/contents/${contentId}`)
    fetchActualDetail()
    // dispatch(delContent(contentId))
  }

  const onDeleteHandler = async (conId) => {
    await dispatch(__delcontent(conId))
    setContent({ content })
    navigate("/")
  }

  const changeInput = (e) => {
    const { name, value } = e.target
    setContent({ ...content, [name]: value })
  }

  useEffect(() => {
    fetchActualDetail()
    dispatch(__getcontents())
  }, [dispatch])

  // const detailReply = replys?.find((rep) => rep.content_id === pageId)
  if (isLoading) {
    return (
      <StDetailWrapper>
        <StDetail>
          <p>감상하는 중...</p>
        </StDetail>
      </StDetailWrapper>
    )
  }

  if (error) {
    return (
      <StDetailWrapper>
        <StDetail>{error.message}</StDetail>
      </StDetailWrapper>
    )
  }
  if (renderStatus) {
    return (
      <>
        <StDetailWrapper>
          <DetailBox>
            <div style={{ gridArea: "title", fontSize: "24px" }}>
              제목 : {content.content_title}
            </div>
            <div style={{ gridArea: "body" }}>{content.content_body}</div>
            <div style={{ gridArea: "link" }}>
              링크 : {content.content_link}
            </div>
            <div style={{ gridArea: "genre" }}>
              {" "}
              장르 : {content.content_genre}
            </div>
            <div style={{ gridArea: "author" }}>
              작성자 : {content.content_author}
            </div>
            <BtnBox style={{ gridArea: "btn" }}>
              <DeBtn onClick={() => setRenderStatus(false)}>수정하기</DeBtn>
              <DeBtn
                onClick={(e) => {
                  if (!window.confirm("삭제하시겠습니까?")) {
                    // 취소(아니오) 버튼 클릭 시 이벤트
                    return
                  } else {
                    // 확인(예) 버튼 클릭 시 이벤트
                    onDeleteHandler(pageId)
                  }
                }}
              >
                삭제하기
              </DeBtn>
            </BtnBox>
            <div style={{ gridArea: "date" }}>{content.content_date}</div>
          </DetailBox>
          <br />
          <br />
          <br />
          <ReplyForm>댓글란</ReplyForm>
        </StDetailWrapper>
      </>
    )
  } else {
    return (
      <>
        <StDetailWrapper>
          <FormBox
            method="post"
            onSubmit={() => {
              if (content.content_title.trim() === "") {
                alert("제목을 적어주세요.")
              } else if (content.content_body.trim() === "") {
                alert("내용을 적어주세요.")
              } else if (content.content_author.trim() === "") {
                alert("작성자명을 적어주세요.")
              } else {
                setContent({ content })
                onClickEditButton(pageId, content)
                setRenderStatus(true)
                fetchActualDetail()
              }
            }}
          >
            <FormInfo>추천글 수정</FormInfo>
            <StTitle
              required
              type="text"
              name="content_title"
              defaultValue={content.content_title}
              maxLength="15"
              onChange={changeInput}
              placeholder="제목"
            ></StTitle>

            <StGenre
              name="content_genre"
              required
              onChange={changeInput}
              defaultValue={content.content_genre}
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
              defaultValue={content.content_body}
              onChange={changeInput}
              placeholder="내용"
            ></StBody>

            <StAuthor
              type="text"
              name="content_author"
              defaultValue={content.content_author}
              onChange={changeInput}
              placeholder="작성자명"
            ></StAuthor>

            <StLink
              type="text"
              name="content_link"
              defaultValue={content.content_link}
              onChange={changeInput}
              placeholder="추천 링크"
            ></StLink>

            <StBtn>확인</StBtn>
          </FormBox>
          <ReplyForm>댓글란</ReplyForm>
        </StDetailWrapper>
      </>
    )
  }
}

export default Detail

const StDetailWrapper = styled.div`
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* text-align: center; */
`

const StDetail = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-width: 600px;
  border: 4px solid ${({ theme }) => theme.azur.deep};
  border-radius: 16px;
  .buttonWrapper {
    display: flex;
    justify-content: space-between;
  }
  p {
    white-space: pre-line;
  }
  span {
    font-size: small;
    ${({ theme }) => theme.common.flexCenterColumn}
    flex-direction:row;
  }
  textarea {
    width: 50%;
    height: 200px;
    ${({ theme }) => theme.common.inputs}
  }
  select {
    width: fit-content;
    height: 40px;
    ${({ theme }) => theme.common.inputs};
  }
`

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
  gap: 30px;
  box-shadow: 12px 12px 2px 1px ${({ theme }) => theme.azur.light};
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
`
const DetailBox = styled.div`
  border: 2px solid ${({ theme }) => theme.azur.deep};
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  display: grid;
  grid-template-areas:
    "title genre"
    "body body"
    "link link"
    "author author"
    "date date"
    "btn btn";
  width: 800px;
  height: 600px;
  grid-auto-columns: 500px 200px;
  grid-auto-rows: 50px 200px 20px 20px 20px 50px;
  justify-content: center;
  gap: 30px;
  box-shadow: 12px 12px 2px 1px ${({ theme }) => theme.azur.light};
`
const BtnBox = styled.div`
  text-align: center;
`

const DeBtn = styled(Button)`
  grid-area: btn;
  height: 50px;
  width: 100px;
  margin: 20px;
`
