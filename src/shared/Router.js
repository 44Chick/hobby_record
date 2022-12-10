import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Posting from "../pages/Posting";
// import Layout from "./Layout";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="posting" element={<Posting />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;