import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import {
  __getcontents,
  updateContent,
  delContent2,
} from "../redux/modules/contentsSlice"
import { DB } from "../redux/modules/contentsSlice"
import Button from "../components/Button"
import FormInput from "../components/FormInput"
import theme from "../styles/theme"
// import useInput from "../hooks/useInput"
// import ReplyForm from "../components/ReplyForm"

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

  /*   const onDeleteHandler = async (e) => {
    await dispatch(delContent2()) // extraReducer
  } */

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
      <ThemeProvider theme={theme}>
        <StDetailWrapper>
          <h1>상세 페이지</h1>
          <StDetail>
            <span>
              작성일: {detailContent?.content_date}
              <div className="buttonWrapper">
                <Button onClick={() => setRenderStatus(false)}>수정</Button>
                <Button
                  onClick={() => {
                    if (!window.confirm("삭제하시겠습니까?")) {
                      // 취소(아니오) 버튼 클릭 시 이벤트
                      return
                    } else {
                      // 확인(예) 버튼 클릭 시 이벤트
                      setContent(null)
                      dispatch(delContent2(pageId))
                      // onClickDelete(pageId)
                      // fetchActualDetail()
                      navigate("/") // 리렌더 안 됨
                      // console.log(content.id, detailContent?.id)
                    }
                  }}
                >
                  삭제
                </Button>
              </div>
            </span>
            <h3>
              {content.content_title}
              <br />- - -
            </h3>
            <span>
              장르: {content.content_genre}
              <br />
              {content.content_link}
            </span>
            <p>{content.content_body}</p>
            <h4>작성자: {content.content_author}</h4>
          </StDetail>
          <div>댓글란</div>
        </StDetailWrapper>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <StDetailWrapper>
          <h1>상세 페이지</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // dispatch(updateContent({ content }))
              // fetchActualDetail()
            }}
          >
            <StDetail>
              <div className="buttonWrapper">
                <span>{detailContent?.content_date}</span>
                <Button
                  onClick={() => {
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
                  확인
                </Button>
              </div>
              <h3>
                <FormInput
                  defaultValue={content.content_title}
                  onChange={(e) => {
                    setContent({ ...content, content_title: e.target.value })
                  }}
                />
                <br />- - -
              </h3>
              <p>
                <textarea
                  defaultValue={content.content_body}
                  onChange={(e) => {
                    setContent({ ...content, content_body: e.target.value })
                  }}
                />
              </p>
              <span>
                링크:
                <FormInput
                  defaultValue={content.content_link}
                  onChange={(e) => {
                    setContent({ ...content, content_link: e.target.value })
                  }}
                />
                &nbsp;
                <label name="genre">장르: </label>
                <select
                  name="content_genre"
                  onChange={(e) => {
                    setContent({ ...content, content_genre: e.target.value })
                  }}
                  defaultValue={content.content_genre}
                >
                  <option>도서</option>
                  <option>영화</option>
                  <option>음악</option>
                  <option>기타</option>
                </select>
              </span>

              <h4>
                {/* 작성자명 */}
                <FormInput
                  defaultValue={content.content_author}
                  onChange={(e) => {
                    setContent({ ...content, content_author: e.target.value })
                  }}
                />
              </h4>
            </StDetail>
          </form>
          <div>댓글란</div>
        </StDetailWrapper>
      </ThemeProvider>
    )
  }
}

export default Detail

const StDetailWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  width: 98%;
  text-align: center;
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
