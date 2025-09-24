import { React } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Protected from "./pages/Protected";
import Search from "./pages/Search";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isVerified = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        {isVerified && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isVerified ? "/search" : "login"} />}
          />
          <Route
            path="/login"
            element={isVerified ? <Navigate to="/search" /> : <Login />}
          />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <Protected />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f0f0f0",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "18px",
//   },
// };
