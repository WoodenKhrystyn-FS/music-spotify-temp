import React, { useEffect } from "react";


function Login() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "https://localhost:3000/api/auth/login";
    }
  }, []);
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
