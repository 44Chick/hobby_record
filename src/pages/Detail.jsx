import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { __getcontents, updateContent } from "../redux/modules/contentsSlice"
import { DB } from "../redux/modules/contentsSlice"
import Button from "../components/Button"
// import ReplyForm from "../components/ReplyForm"
import FormInput from "../components/FormInput"

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

  const fetchActualDetail = async () => {
    const { data } = await axios.get(`${DB}/contents/${parseInt(param.id)}`)
    setContent(data)
  }

  const detailContent = contents?.find((ctt) => ctt.id === parseInt(param.id))

  const onClickEditButton = async (contentId, edit) => {
    await axios.patch(`${DB}/contents/${contentId}`, edit)
    fetchActualDetail()
  }

  useEffect(() => {
    fetchActualDetail()
    dispatch(__getcontents())
  }, [dispatch])

  // const detailReply = replys?.find((rep) => rep.content_id === parseInt(param.id))
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
          <h1>상세 페이지</h1>
          <StDetail>
            <Button onClick={() => setRenderStatus(false)}>수정</Button>
            <h3>
              {content.content_title}
              <br />- - -
            </h3>
            <p>{content.content_body}</p>
            <span>{content.content_link}</span>
            <h4>작성자: {content.content_author}</h4>
            <h4>작성일: {detailContent?.content_date}</h4>
          </StDetail>
          <div>댓글란</div>
        </StDetailWrapper>
      </>
    )
  } else {
    return (
      <>
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
              <Button
                onClick={() => {
                  setContent({ content })
                  onClickEditButton(parseInt(param.id), content)
                  setRenderStatus(true)
                  fetchActualDetail()
                }}
              >
                확인
              </Button>
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
                내용
                <br />
                <FormInput
                  defaultValue={content.content_body}
                  onChange={(e) => {
                    setContent({ ...content, content_body: e.target.value })
                  }}
                />
              </p>
              <span>
                링크
                <br />
                <FormInput
                  defaultValue={content.content_link}
                  onChange={(e) => {
                    setContent({ ...content, content_link: e.target.value })
                  }}
                />
              </span>
              <h4>
                작성자:
                <br />
                <FormInput
                  defaultValue={content.content_author}
                  onChange={(e) => {
                    setContent({ ...content, content_author: e.target.value })
                  }}
                />
              </h4>
              <h4>작성일: {detailContent?.content_date}</h4>
            </StDetail>
          </form>
          <div>댓글란</div>
        </StDetailWrapper>
      </>
    )
  }
}

export default Detail

const StDetailWrapper = styled.div`
  /* position: relative; */
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  h4 {
    text-align: right;
  }
`

const StDetail = styled.div`
  position: relative;
  max-width: 1200px;
  min-width: 600px;
  border: 4px solid pink;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`
