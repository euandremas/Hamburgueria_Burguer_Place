const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new AppError("Token de autenticação não informado.", 401, "TOKEN_MISSING"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return next(new AppError("Token inválido ou expirado.", 401, "TOKEN_INVALID"));
  }
}

module.exports = authMiddleware;
