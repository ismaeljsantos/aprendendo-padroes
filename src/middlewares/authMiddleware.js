// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "so-jesus-salva");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;
