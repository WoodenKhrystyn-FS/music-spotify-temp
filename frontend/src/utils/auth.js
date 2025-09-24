import jwtdecode from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const validToken = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtdecode(token);
    if (Date.new() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (err) {
    console.log("Invalid Token");
    localStorage.removeItem("token");
    return false;
  }
};
