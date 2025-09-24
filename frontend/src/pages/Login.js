import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const expires = new Date(localStorage.getItem("tokenExpire"));
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "https://localhost:3000/api/auth/login";
    } else if (new Date() < expires) {
      //Token is valid
      navigate("/dashboard");
    } else {
      //Token expired and refreshes
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpire");
      window.location.href = "https://localhost:3000/api/auth/refreshToken";
    }
  }, [navigate]);
  const handleLogin = () => {
    window.location.href = "https://localhost:3000/api/auth/login";
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>Click the button below to login with Spotify:</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
