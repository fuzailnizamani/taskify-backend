const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // ✅ Ensure `authHeader` exists before calling `startsWith`
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });

    // ✅ Ensure `decoded` contains the expected properties
    if (!decoded.id || !decoded.username) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.user = { id: decoded.id, username: decoded.username };
    next();
  });
};

module.exports = verifyJWT;