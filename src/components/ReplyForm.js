import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getReplys } from "../redux/modules/replysSlice";

const DB = process.env.React_APP_DBSERVER;

const ReplyForm = () => {
  const [reply, setReply] = useState({
    id: 0,
    reply_body: "",
    reply_date: new Date(),
    contentId: 0,
  });

  const dispatch = useDispatch();
  const [replys, setReplys] = useState(null);
  const [editReply, setEditReply] = useState({
    reply_body: "",
  });

  // const fetchReplys = async () => {
  //   const { data } = await axios.get(`${DB}/replys`);
  //   setReplys(data);
  // };

  const onSubmitReplyHandler = (reply) => {
    axios.post(`${DB}/replys`, reply);
    setReplys([...replys, reply]);
  };

  const onClickDeleteReplyHandler = (replyId) => {
    axios.delete(`${DB}/replys/${replyId}`);
    setReplys([...replys]);
  };

  const onClickEditReplyHandler = (replyId, edit) => {
    axios.patch(`${DB}/replys/${replyId}`, edit);
    setReplys([...replys]); // 페이지내에서 변경할수 있도록
  };

  useEffect(() => {
    dispatch(__getReplys());
  }, [dispatch]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitReplyHandler(reply);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            const { value } = e.target;
            setReply({
              ...reply,
              body: value,
            });
          }}
        />
        <button>저장하기</button>
      </form>
      <div>
        {replys?.map((reply) => (
          <div key={reply.id}>
            {reply.id}, {reply.body}
            <button
              type="button"
              onClick={() => onClickDeleteReplyHandler(reply.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReplyForm;
