const jwt = require("jsonwebtoken");
const JWT_KEY = "Ju&%NUveGf$";

const fetchuser = (req, res, next) => {
  //Get user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please Authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please Authenticate using valid token" });
  }
};
module.exports = fetchuser;
