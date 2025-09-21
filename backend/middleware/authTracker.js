const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies ? req.cookies.token : null;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && !req) {
    token = req.cookies.token;
  }
  
  if (!token) {   
    return res.status(401).json({ message: "No token provided" });
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

module.exports = {
  verifyToken,
};
