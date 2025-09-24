import { Navigate } from "react-router-dom";
import { validToken } from "../utils/auth";

//Protects routes requiring authentication

function PrivateRoute({ children }) {
  //If the user is authenticated, render the child components (protected routes)

  const token = localStorage.getItem("token");
  const tokenExpire = localStorage.getItem("tokenExpiry");

  if (validToken()) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
export default PrivateRoute;
