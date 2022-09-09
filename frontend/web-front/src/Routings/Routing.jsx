import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages 
import TopPage from "../pages/TopPage";
import Diagnosis from "../pages/Diagnosis";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="diagnosis" element={<Diagnosis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
