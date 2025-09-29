import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//Protects routes requiring authentication

function PrivateRoute({ children }) {
  //If the user is authenticated, render the child components

  const [isVerified, setIsVerified] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/validateToken",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsVerified(true);
        } else {
          throw new Error("Token Not Valid");
        }
      } catch (error) {
        console.log("Error in Verifying Token:", error);
        localStorage.removeItem("token");
        setIsVerified(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isVerified === null) {
    return <p>Loading...</p>;
  }

  //checking if token is valid
  return isVerified ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;
