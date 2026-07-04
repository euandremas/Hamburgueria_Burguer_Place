const { Router } = require("express");

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;