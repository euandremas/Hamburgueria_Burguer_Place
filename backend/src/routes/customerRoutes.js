const { Router } = require("express");
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", authMiddleware, customerController.list);
router.get("/:id", authMiddleware, customerController.findById);
router.post("/", authMiddleware, customerController.create);
router.put("/:id", authMiddleware, customerController.update);
router.delete("/:id", authMiddleware, customerController.remove);

module.exports = router;
