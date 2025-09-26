import React from "react";
import { Navigate } from "react-router-dom";
// import { validToken } from "../utils/auth";

//Protects routes requiring authentication

function PrivateRoute({ children }) {
  //If the user is authenticated, render the child components

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;
