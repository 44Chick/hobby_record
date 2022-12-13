import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { addReply, __getReplys } from "../redux/modules/replysSlice"
import { DB } from "../redux/modules/contentsSlice"

const ReplyForm = () => {
  const [reply, setReply] = useState({
    id: 0,
    reply_body: "",
    // reply_date: new Date(),
    content_id: 0,
  })
  const dispatch = useDispatch()
  const prm = useParams()
  const { isLoading, error, replys } = useSelector((state) => state.replys)
  // const detailReply = replys?.find((rep) => rep.content_id === parseInt(prm.id))

  const changeReply = (event) => {
    const { name, value } = event.target
    setReply({ ...reply, [name]: value })
  }

  const onSubmitReplyHandler = (event) => {
    event.preventDefault()
    dispatch(addReply({ ...reply }))
  }

  const onClickDeleteReplyHandler = (replyId) => {
    axios.delete(`${DB}/replys/${parseInt(prm.id)}`)
    setReply({ ...reply })
  }

  // const onClickEditReplyHandler = (replyId, edit) => {
  //   axios.patch(`http://localhost:3001/replys/${replyId}`, edit);
  //   setReply([...reply]); // 페이지내에서 변경할수 있도록
  // };

  useEffect(() => {
    dispatch(__getReplys())
  }, [dispatch])

  const detailReply = replys?.filter(
    (rep) => rep.content_id === parseInt(prm.id)
  )

  if (isLoading) {
    return <div>로딩중입니다.</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  console.log(detailReply)
  return (
    <Stmain>
      <form onSubmit={onSubmitReplyHandler}>
        <input
          type="text"
          name="reply_body"
          defaultValue={replys?.reply_body}
          onChange={changeReply}
          placeholder="댓글을 남겨주세요"
        />
        <button>저장하기</button>
      </form>
      <div>
        ID:{replys?.reply_id} date:{replys?.reply_date} = {replys?.reply_body}
        <button type="button">수정하기</button>
        <button
          type="button"
          onClick={() => onClickDeleteReplyHandler(reply.id)}
        >
          삭제하기
        </button>
      </div>
      {/* <div>
        {replys?.map((reply) => {
          if (reply.content_id === parseInt(prm.id)) {
            return (
              <div key={reply.id}>
                ID:{replys?.reply_id} date:{replys?.reply_date} ={" "}
                {replys?.reply_body}
                <button type="button">수정하기</button>
                <button
                  type="button"
                  onClick={() => onClickDeleteReplyHandler(reply.id)}
                >
                  삭제하기
                </button>
              </div>
            )
          }
        })}
      </div> */}
    </Stmain>
  )
}

export default ReplyForm

const Stmain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 350px;
  width: 600px;
  border: 4px solid pink;
`
