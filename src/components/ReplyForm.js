import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActionData, useParams } from "react-router-dom";
import styled from "styled-components";
import { DB } from "../redux/modules/contentsSlice";
import { addReply, __getReplys } from "../redux/modules/replysSlice";

function getFormatDate() {
  const date = new Date();
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

const ReplyForm = () => {
  const [replyRender, setReplyRender] = useState(true);
  const prm = useParams();
  const [reply, setReply] = useState({
    id: "",
    reply_body: "",
    reply_date: "",
    content_id: parseInt(prm.id),
  });

  const dispatch = useDispatch();
  const { isLoading, error, replys } = useSelector((state) => state.replys);

  const changeReply = (event) => {
    const { name, value } = event.target;
    setReply({ ...reply, [name]: value });
  };

  const onSubmitReplyHandler = (event) => {
    event.preventDefault();
    reply.reply_date = getFormatDate();
    dispatch(addReply({ ...reply }));
  };

  const fetchReply = async () => {
    const { data } = await axios.get(`${DB}/replys/${reply.id}`);
    setReply(data);
  };

  const onClickDeleteReplyHandler = (replyId) => {
    axios.delete(`${DB}/replys/${replyId}`);
    setReply({ ...reply });
  };

  // const onChangeReplyHandler = (event, replyIndex) => {
  //   const reply
  // }

  const onClickEditReplyHandler = async (replyId, edit) => {
    await axios.patch(`${DB}/replys/${replyId}`, edit);
    fetchReply();
  };

  useEffect(() => {
    dispatch(__getReplys());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Stmain replyRender={replyRender}>
      {replyRender ? (
        <form onSubmit={onSubmitReplyHandler}>
          <input
            type="text"
            name="reply_body"
            value={reply.reply_body}
            onChange={changeReply}
            placeholder="댓글을 남겨주세요"
          />
          <button>저장하기</button>
          <div>
            {replys?.map((reply) => {
              if (reply.content_id === parseInt(prm.id)) {
                return (
                  <div key={reply.id}>
                    ID:{reply.id} date:{reply.reply_date} = {reply.reply_body}
                    <button type="button" onClick={() => setReplyRender(false)}>
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => onClickDeleteReplyHandler(reply.id)}
                    >
                      삭제하기
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmitReplyHandler}>
          <input
            type="text"
            name="reply_body"
            value={reply.reply_body}
            onChange={changeReply}
            placeholder="댓글을 남겨주세요"
          />
          <button>저장하기</button>
          <div>
            {replys?.map((reply) => {
              if (reply.content_id === parseInt(prm.id)) {
                return (
                  <div key={reply.id}>
                    ID:{reply.id} date:{reply.reply_date} =
                    <input type="text" defaultValue={reply.reply_body} />
                    <button
                      onClick={() => {
                        if (reply.reply_body.trim() === "") {
                          alert("내용을 입력해주세요.");
                        } else {
                          onClickEditReplyHandler(reply.id, reply.reply_body);
                          setReplyRender(true);
                        }
                      }}
                    >
                      완료
                    </button>
                    <button
                      type="button"
                      onClick={() => onClickDeleteReplyHandler(reply.id)}
                    >
                      삭제하기
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </form>
      )}
    </Stmain>
  );
};

export default ReplyForm;

const Stmain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 350px;
  width: 600px;
  border: 4px solid pink;
`;
