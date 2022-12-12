import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { __getcontents } from "../redux/modules/contentsSlice"

function Detail() {
  const [content, setContent] = useState([])
  const dispatch = useDispatch()
  const { contents, isLoading, error } = useSelector((state) => state.contents)
  const fetchContent = async () => {
    /* const { data } = await axios.get(
      "https://test-json-server-six.vercel.app/contents"
    ) */
    const { data } = await axios.get("http://localhost:3001/contents")
    setContent(data)
  }

  useEffect(() => {
    // fetchContent()
    dispatch(__getcontents())
  }, [dispatch])

  const param = useParams()
  const detailContent = contents?.find((ctt) => ctt.id === parseInt(param.id))
  if (isLoading) {
    return <div>감상하는 중...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    // 옵셔널체이닝 떼지 말 것!!!
    <StDetailWrapper>
      <h1>상세 페이지</h1>
      <StDetail key={detailContent?.id}>
        <button type="button">수정하기</button>
        <h3>{detailContent?.content_title}</h3>
        <p>{detailContent?.content_body}</p>
        <span>{detailContent?.content_link}</span>
        <h4>작성자: {detailContent?.content_author}</h4>
        <h4>작성일: {detailContent?.content_date}</h4>
      </StDetail>
      <div>댓글란</div>
    </StDetailWrapper>
  )
}

export default Detail

const StDetailWrapper = styled.div`
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
    float: right;
  }
`

const StDetail = styled.div`
  max-width: 1200px;
  min-width: 600px;
  border: 4px solid pink;
`
