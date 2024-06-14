import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTaskComponent from "./pages/Addtask";

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-task" element={<AddTaskComponent />} />
  </Routes>
);

export default routes;
