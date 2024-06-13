import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddTaskComponent from "./Addtask";

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-task" element={<AddTaskComponent />} />
  </Routes>
);

export default routes;
