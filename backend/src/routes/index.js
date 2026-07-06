const { Router } = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const customerRoutes = require("./customerRoutes");
const orderRoutes = require("./orderRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const cepRoutes = require("./cepRoutes");
const userRoutes = require("./userRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/cep", cepRoutes);
router.use("/users", userRoutes);

module.exports = router;
