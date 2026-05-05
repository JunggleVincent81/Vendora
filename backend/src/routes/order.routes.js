const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize(["buyer"]), controller.createOrder);
router.get("/me", verifyToken, controller.getMyOrders);
router.get("/seller", verifyToken, authorize(["seller"]), controller.getSellerOrders);
router.put("/:id/status", verifyToken, authorize(["seller"]), controller.updateOrderStatus);

module.exports = router;