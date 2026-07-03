function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV !== "test") {
    console.error("[error]", {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: statusCode === 500 ? "Erro interno do servidor." : err.message
    }
  });
}

module.exports = errorMiddleware;
