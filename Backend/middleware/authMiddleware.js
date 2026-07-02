 const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};


const adminOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json("Admin only");
  }
  next();
};

module.exports = { auth, adminOnly };
