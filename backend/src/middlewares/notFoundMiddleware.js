const AppError = require("../utils/AppError");

function notFoundMiddleware(req, res, next) {
  next(new AppError(`Rota não encontrada: ${req.method} ${req.originalUrl}`, 404, "ROUTE_NOT_FOUND"));
}

module.exports = notFoundMiddleware;
