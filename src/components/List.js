// src/App.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getcontents } from "../redux/modules/contentsSlice";

// const DB = process.env.React_APP_DBSERVER

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, contents } = useSelector((state) => state.contents);
  console.log(isLoading, error, contents)

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
        <div key={content.content_id}>{content.content_title}</div>
      ))}
    </div>
  );
};

export default List;