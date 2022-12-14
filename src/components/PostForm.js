import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addContent, __addcontents} from "../redux/modules/contentsSlice";

import "./PostForm.css";

function getFormatDate() {
  const date = new Date();
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function PostForm() {
  const navigate = useNavigate();
  const {error, msg} = useSelector((state)=> state.contents)
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    content_title: "",
    content_body: "",
    content_author: "",
    content_genre: "장르",
    content_link: "",
    content_date: "",
  });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const onAddHandler = async (e) => {
    e.preventDefault();
    // if(!window.confirm("추가 하겠습니까?")){
    //   return 
    // } else {
    // }
    content.content_date = getFormatDate();
    await dispatch(__addcontents({ ...content }));
    navigate("/")
  };
  // onClick={() => {
  //   if (!window.confirm("삭제하시겠습니까?")) {
  //     // 취소(아니오) 버튼 클릭 시 이벤트
  //     return
  //   } else {
  //     // 확인(예) 버튼 클릭 시 이벤트
  //     setContent(null)
  //     dispatch(delContent(pageId))
  //     // onClickDelete(pageId)
  //     // fetchActualDetail()
  //     navigate("/") // 리렌더 안 됨
  //   }
  // }}
  

  return (
    <div>
      FORM
      <form className="form-box" method="post" onSubmit={onAddHandler}>
        <input
          required
          type="text"
          name="content_title"
          value={content.content_title}
          maxLength="15"
          onChange={changeInput}
          placeholder="제목 입력"
        ></input>
        <textarea
          required
          name="content_body"
          value={content.content_body}
          onChange={changeInput}
          placeholder="내용 입력"
        ></textarea>
        <input
          type="text"
          name="content_author"
          value={content.content_author}
          onChange={changeInput}
          placeholder="당신 이름"
        ></input>
        <input
          type="text"
          name="content_link"
          value={content.content_link}
          onChange={changeInput}
          placeholder="추천 링크"
        ></input>
        <select
          name="content_genre"
          required
          onChange={changeInput}
          value={content.content_genre}
        >
          <option value="" hidden>
            장르
          </option>
          <option value="book">도서</option>
          <option value="movie">영화</option>
          <option value="album">음악</option>
          <option value="etc">기타</option>
        </select>
        <button>확인</button>
      </form>
    </div>
  );
}

export default PostForm;
