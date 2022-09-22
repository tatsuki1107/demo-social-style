import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthService";

const LoggedInRoute = ({ children }) => {
  const { user } = useAuth();

  if (user.token === "") {
    return <Navigate to="/" />
  }
  return children;
};

export default LoggedInRoute;
