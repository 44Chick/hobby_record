import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getcontents } from "../redux/modules/contentsSlice";

// const DB = process.env.React_APP_DBSERVER

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, contents } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(__getcontents());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {contents.map((content) => (
        <div key={content.content_id}>
          <h3>{content.content_title}</h3>
          <div>{content.content_body}</div>
          <a href={content.content_link}>Link</a>
          <div>{content.content_date}</div>
        </div>
      ))}
    </div>
  );
};

export default List;