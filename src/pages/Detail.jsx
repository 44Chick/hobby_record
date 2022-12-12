import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { __getcontents } from "../redux/modules/contentsSlice"
import { DB } from "../redux/modules/contentsSlice"
import Button from "../components/Button"

function Detail() {
  const [content, setContent] = useState([])
  const dispatch = useDispatch()
  const { contents, isLoading, error } = useSelector((state) => state.contents)
  const fetchContent = async () => {
    const { data } = await axios.get(`${DB}/contents`)
    setContent(data)
  }

  useEffect(() => {
    // fetchContent()
    dispatch(__getcontents())
  }, [dispatch])

  const param = useParams()
  const detailContent = contents?.find((ctt) => ctt.id === parseInt(param.id))
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

  return (
    // 옵셔널체이닝 떼지 말 것!!!
    <>
      <h1>상세 페이지</h1>
      <StDetailWrapper>
        <Button onClick={() => console.log(detailContent?.content_title)}>
          수정하기
        </Button>
        <StDetail>
          <h3>
            {detailContent?.content_title}
            <br />- - -
          </h3>
          <p>{detailContent?.content_body}</p>
          <span>{detailContent?.content_link}</span>
          <h4>작성자: {detailContent?.content_author}</h4>
          <h4>작성일: {detailContent?.content_date}</h4>
        </StDetail>
        <div>댓글란</div>
      </StDetailWrapper>
    </>
  )
}

export default Detail

const StDetailWrapper = styled.div`
  position: relative;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    text-align: center;
  }
  h4 {
    text-align: right;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const StDetail = styled.div`
  max-width: 1200px;
  min-width: 600px;
  border: 4px solid pink;
`
