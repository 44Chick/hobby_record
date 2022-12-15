import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { addReply, __getReplys } from "../redux/modules/replysSlice"
import { DB } from "../redux/modules/replysSlice"

const ReplyForm = () => {
  const [reply, setReply] = useState({})
  const [oneReply, setOneReply] = useState({
    id: 0,
    reply_body: "",
    reply_date: "2022-12-15",
    content_id: 0,
  })
  const dispatch = useDispatch()
  const prm = useParams()
  const prmId = parseInt(prm.id)
  const { isLoading, error, replys } = useSelector((state) => state.replys)
  // const detailReply = replys?.find((rep) => rep.content_id === parseInt(prm.id))

  const fetchReplys = async () => {
    const { data } = await axios.get(`${DB}/replys`)
    setReply(data)
  }

  const fetchOneReply = async () => {
    const { data } = await axios.get(`${DB}/replys?content_id=${prmId}`)
    setOneReply(data)
  }

  const changeReply = (event) => {
    const { name, value } = event.target
    setReply({ ...reply, [name]: value })
  }

  const onSubmitReplyHandler = (event) => {
    event.preventDefault()
    dispatch(addReply({ ...reply }))
  }

  const onClickDeleteReplyHandler = (replyId) => {
    axios.delete(`${DB}/replys/${replyId}`)
    setReply({ ...reply })
  }

  // const onClickEditReplyHandler = (replyId, edit) => {
  //   axios.patch(`${DB}/replys/${replyId}`, edit);
  //   setReply([...reply]); // 페이지내에서 변경할수 있도록
  // };

  useEffect(() => {
    dispatch(__getReplys())
    fetchReplys()
    fetchOneReply()
  }, [dispatch])

  if (isLoading) {
    return <div>로딩중입니다.</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  console.log(reply)
  console.log(oneReply)
  return (
    <Stmain>
      <form onSubmit={onSubmitReplyHandler}>
        <input
          type="text"
          name="reply_body"
          value={replys.reply_body}
          onChange={changeReply}
          placeholder="댓글을 남겨주세요"
        />
        <button>저장하기</button>
      </form>
      <div>
        {replys?.map((item) => {
          return (
            <div key={"r" + item.id}>
              date:{item.reply_date} = {item.reply_body}
              {/* <button type="button">수정하기</button> */}
              <button
                type="button"
                onClick={() => onClickDeleteReplyHandler(item.id)}
              >
                삭제하기
              </button>
            </div>
          )
        })}
      </div>
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
