const { Router } = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.use(authMiddleware);

router.get("/", userController.list);
router.post("/", userController.create);
router.delete("/:id", userController.remove);

module.exports = router;