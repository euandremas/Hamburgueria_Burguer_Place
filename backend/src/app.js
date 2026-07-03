require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Burger Place API online" });
});

app.use(routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
