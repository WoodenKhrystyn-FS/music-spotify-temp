import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Login page Component

function Login() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const expires = new Date(localStorage.getItem("tokenExpire"));
  //   const token = localStorage.getItem("token");

  //   if (token && expires > new Date()) {
  //     //No token, redirect to login page
  //     navigate("/login");
  //     // window.location.href = "https://localhost:3000/api/auth/login";
  //   } else {
  //     //Token expired and refreshes
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("tokenExpire");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  //Redirecting user to the backend authorization
  const handleLogin = () => {
    window.location.href = "https://localhost:3000/api/auth/login";
  };

  return (
    <div style={styles.container}>
      <h1>Search Spotify Music</h1>
      <p>Click the button below to login with Spotify</p>
      <button onClick={handleLogin} style={styles.button}>
        Login with Spotify
      </button>
    </div>
  );
}

export default Login;

//Styling:
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    padding: "10px 20px",
    marignLeft: "10px",
    backgroundColor: "#1DB954",
    color: "white",
  },
};

// --- IGNORE ---
// import React from "react";
// import { useNavigate } from "react-router-dom";

// //Login page Component
// function Login() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     window.location.href = "https://localhost:3000/api/auth/login";
//   };

//   return (
//     <div className="login-page">
//       <h1>Login</h1>
//       <p>Click the button below to login with Spotify:</p>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
// --- IGNORE ---
