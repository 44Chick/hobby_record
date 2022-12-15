import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { addReply, __getReplys } from "../redux/modules/replysSlice"
import { DB } from "../redux/modules/replysSlice"

import Input from "./Input"
import Button from "./Button"

const ReplyForm = () => {
  const [reply, setReply] = useState({
    id: 0,
    reply_body: "",
    // reply_date: new Date(),
    content_id: 0,
  })
  const dispatch = useDispatch()
  const prm = useParams()
  const prmId = parseInt(prm.id)
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
    axios.delete(`${DB}/replys/${replyId}`)
    setReply({ ...reply })
  }

  // const onClickEditReplyHandler = (replyId, edit) => {
  //   axios.patch(`${DB}/replys/${replyId}`, edit);
  //   setReply([...reply]); // 페이지내에서 변경할수 있도록
  // };

  useEffect(() => {
    dispatch(__getReplys())
  }, [dispatch])

  if (isLoading) {
    return <div>로딩중입니다.</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Stmain>
      <FormBox onSubmit={onSubmitReplyHandler}>
        <ReInput
          type="text"
          name="reply_body"
          value={replys.reply_body}
          onChange={changeReply}
          placeholder="댓글을 남겨주세요"
        />
        <ReBtn>저장하기</ReBtn>
      </FormBox>
      <br />
      <br />
      <ReList>
        {replys?.map((reply) => {
          if (reply.content_id === prmId) {
            //   return (
            return (
              <div key={reply.id}>
                <ReElement>
                <div>
                  {replys?.reply_body}
                </div>
                <div>
                  <Button type="button">수정하기</Button>
                  <Button
                    type="button"
                    onClick={() => onClickDeleteReplyHandler(reply.id)}
                  >
                    삭제하기
                  </Button>
                </div>
                </ReElement>
                <div>
                  date:{replys?.reply_date}
                </div>
              </div>
            )
          }
        })}
      </ReList>
    </Stmain>
  )
}

export default ReplyForm

const Stmain = styled.div`
border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.azur.deep};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 800px;
  box-shadow: 12px 12px 2px 1px ${({ theme }) => theme.azur.light};
`

const FormBox = styled.form`
  border-radius: 10px;
  width: 600px;
  padding: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  margin: 10px;
`

const ReInput = styled(Input)`
  width: 350px;
`

const ReBtn = styled(Button)`
  height: 40px;
  width: 100px;
`

const ReList = styled.div`
  width: 600px;
  margin:10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`

const ReElement = styled.div`
  border-bottom:2px solid ${({ theme }) => theme.azur.deep};
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
