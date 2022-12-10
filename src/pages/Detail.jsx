import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

function Detail() {
  const [contents, setContents] = useState(null)

  const fetchContent = async () => {
    const { data } = await axios.get(
      "https://test-json-server-six.vercel.app/contents"
    )
    setContents(data)
  }

  const param = useParams()

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    // DB 들어오나 테스트
    <StDetailWrapper>
      <h1>상세 페이지</h1>
      {contents?.map((detail) => (
        <>
          <StDetail id={detail.content_id}>
            <button type="button">수정하기</button>
            <h3>{detail.content_title}</h3>
            <p>{detail.content_body}</p>
            <span>{detail.content_link}</span>
            <h4>작성자: {detail.content_author}</h4>
            <h4>작성일: {detail.content_date}</h4>
          </StDetail>
          <div>댓글 입력란</div>
        </>
      ))}
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
