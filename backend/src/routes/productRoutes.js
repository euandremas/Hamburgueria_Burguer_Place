const { Router } = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", productController.list);
router.get("/:id", productController.findById);
router.post("/", authMiddleware, productController.create);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id", authMiddleware, productController.remove);

module.exports = router;
