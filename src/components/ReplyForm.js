import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
  addReply,
  deleteReply,
  __deleteReplys,
  __getReplys,
} from "../redux/modules/replysSlice"
import { DB } from "../redux/modules/replysSlice"

import Input from "./Input"
import Button from "./Button"

function getFormatDate() {
  const date = new Date()
  var year = date.getFullYear() //yyyy
  var month = 1 + date.getMonth() //M
  month = month >= 10 ? month : "0" + month //month 두자리로 저장
  var day = date.getDate() //d
  day = day >= 10 ? day : "0" + day //day 두자리로 저장
  return year + "-" + month + "-" + day //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

const ReplyForm = () => {
  const prm = useParams()
  const prmId = parseInt(prm.id)
  const navigate = useNavigate()

  // 전체 reply
  const [reply, setReply] = useState({})

  // content_id에 따른 reply
  const [oneReply, setOneReply] = useState({
    id: 0,
    reply_body: "",
    reply_date: "2022-12-15",
    content_id: 0,
  })

  // 작성중인 reply 하나
  const [newReply, setNewReply] = useState({
    reply_body: "",
    reply_date: getFormatDate(),
    content_id: prmId,
  })

  const dispatch = useDispatch()
  const { isLoading, error, replys } = useSelector((state) => state.replys)
  // const detailReply = replys?.find((rep) => rep.content_id === parseInt(prm.id))

  const fetchReplys = async () => {
    // 전체 reply
    const { data } = await axios.get(`${DB}/replys`)
    setReply(data)
  }

  const fetchOneReply = async () => {
    // content_id에 맞는 reply
    const { data } = await axios.get(`${DB}/replys?content_id=${prmId}`)
    setOneReply(data)
  }

  const changeReply = (event) => {
    const { name, value } = event.target
    setNewReply({ ...newReply, [name]: value })
  }

  const onSubmitReplyHandler = (event) => {
    event.preventDefault()
    dispatch(addReply({ ...newReply }))
    fetchReplys()
  }

  const onClickDeleteReplyHandler = (replyId) => {
    // await axios.delete(`${DB}/replys/${replyId}`)
    dispatch(deleteReply(replyId))
    setReply({ ...reply })
    fetchOneReply()
    // navigate(`/detail/${prmId}`)
  }

  // const onClickEditReplyHandler = (replyId, edit) => {
  //   axios.patch(`${DB}/replys/${replyId}`, edit);
  //   setReply([...reply]); // 페이지내에서 변경할수 있도록
  // };

  useEffect(() => {
    dispatch(__getReplys())
    fetchReplys()
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
          value={newReply.reply_body}
          onChange={changeReply}
          placeholder="댓글을 남겨주세요"
        />
        <ReBtn>저장하기</ReBtn>
      </FormBox>
      <br />
      <br />
      <ReList>
        {replys?.map((item) => {
          if (item.content_id === prmId) {
            return (
              <div key={item.id}>
                <ReElement>
                  <div>{item.reply_body}</div>
                  <div>
                    {/* <Button type="button">수정하기</Button> */}
                    <Button
                      type="button"
                      onClick={() => onClickDeleteReplyHandler(item.id)}
                    >
                      삭제하기
                    </Button>
                  </div>
                </ReElement>
                <div>date:{item.reply_date}</div>
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
  margin: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`

const ReElement = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.azur.deep};
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
