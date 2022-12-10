import React, { useState } from "react"

function PostForm() {
  const [content, setContent] = useState({
    content_title: "",
    content_body: "",
    content_author: "",
    content_genre: "",
    content_link: "",
    content_date: "",
  })

  return (
    <div>
      FORM
      <form method="post">
        <input
          required
          type="text"
          value={content.content_title}
          maxLength="15"
          onChange={}
          placeholder="제목 입력"
        ></input>
        <textarea
          required
          value={content.content_body}
          placeholder="내용 입력"
        ></textarea>
        <input type="text" value={content.content_author}></input>
        <select name="genre">
          <option value="book">도서</option>
          <option value="movie">영화</option>
          <option value="album">음악</option>
          <option value="etc">기타</option>
        </select>
      </form>
    </div>
  )
}

export default PostForm
