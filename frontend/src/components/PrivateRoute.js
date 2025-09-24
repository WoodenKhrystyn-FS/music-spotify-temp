import { Navigate } from "react-router-dom";
import { validToken } from "../utils/auth";

function PrivateRoute({ children }) {
    // return validToken() ? children : <Navigate to={"/login"} />;
  if (validToken()) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
export default PrivateRoute;
