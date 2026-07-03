const { Router } = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.use(authMiddleware);

router.get("/", orderController.list);
router.get("/:id", orderController.findById);
router.post("/", orderController.create);
router.put("/:id/status", orderController.updateStatus);
router.put("/:id/eta", orderController.updateEta);
router.delete("/:id", orderController.remove);

module.exports = router;
