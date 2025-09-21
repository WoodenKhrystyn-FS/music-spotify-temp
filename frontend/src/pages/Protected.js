import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  });

  fetch("https://localhost:3000/api/auth/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("User is not authenticated");
      return res.json();
    })
    .then((data) => setUser(data.user))
    .catch(
      (err) => {
        console.error(err);
        navigate("/login");
      },
      [navigate]
    );

  //Logout function

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //If there is not a user shown loading
  if (!user) {
    return <div>Please Wait for Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is only accessible to authenticated users.</p>

      <p>Hello There, {user?.spotifyId} !</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Protected;
