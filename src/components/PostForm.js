import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContent } from "../redux/modules/contentsSlice";
import "./PostForm.css"


function PostForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    content_title: "",
    content_body: "",
    content_author: "",
    content_genre: "장르",
    content_link: "",
    content_date: "",
  })

  const changeInput = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value })
    console.log(name, value)
  }

  const onAddHandler = (e) => {
    e.preventDefault();
    content.content_date = new Date().getDate();
    dispatch(addContent({...content}));
  };

  return (
    <div className="wrapper">
      FORM
      <form method="post" onSubmit={onAddHandler}>
        <input
          required
          type="text"
          name="content_title"
          value={content.content_title}
          maxLength="15"
          onChange={changeInput}
          placeholder="제목 입력"></input>
        <textarea
          required
          name="content_body"
          value={content.content_body}
          onChange={changeInput}
          placeholder="내용 입력"></textarea>
        <input 
          type="text"
          name="content_author" 
          value={content.content_author}
          onChange={changeInput}
          placeholder="당신 이름"></input>
        <input
          type="text"
          name="content_link"
          value={content.content_link}
          onChange={changeInput}
          placeholder="추천 링크">
        </input>
        <select
          name="content_genre"
          required
          onChange={changeInput}
          value={content.content_genre}
        >
          <option value="" hidden>장르</option>
          <option  value="book">도서</option>
          <option  value="movie">영화</option>
          <option  value="album">음악</option>
          <option  value="etc">기타</option>
        </select>
        <button>확인</button>
      </form>
    </div>
  )
}

export default PostForm;