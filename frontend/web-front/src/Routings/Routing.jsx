import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthService";
import LoggedInRoute from "./LoggedInRoute";

// pages 
import TopPage from "../pages/TopPage";
import Diagnosis from "../pages/Diagnosis";
import TemporaryLogin from "../pages/TemporaryLogin";
import PastResult from "../pages/PastResult";


const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<TopPage />} />

          <Route
            path="diagnosis"
            element={
              <LoggedInRoute>
                <Diagnosis />
              </LoggedInRoute>
            } />

          <Route
            path="past_result"
            element={
              <LoggedInRoute>
                <PastResult />
              </LoggedInRoute>
            } />

          <Route
            path="temporaryLogin"
            element={<TemporaryLogin />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
