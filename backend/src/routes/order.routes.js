const express = require("express");
const router = express.Router();
const verifiedSeller = require("../middlewares/verifiedSeller.middleware");

const controller = require("../controllers/order.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");


// ==========================
// CREATE ORDER (BUYER)
// ==========================
router.post(
  "/",
  verifyToken,
  authorize(["buyer"]),
  controller.createOrder
);


// ==========================
// BUYER ORDERS
// ==========================
router.get(
  "/me",
  verifyToken,
  authorize(["buyer"]),
  controller.getMyOrders
);


// ==========================
// SELLER ORDERS (CLEAN VERSION)
// ==========================
router.get(
  "/seller/orders",
  verifyToken,
  authorize(["seller"]),
  verifiedSeller,
  controller.getSellerOrders
);


// ==========================
// ORDER DETAIL (SELLER)
// ==========================
router.get(
  "/seller/orders/:id",
  verifyToken,
  authorize(["seller"]),
  verifiedSeller,
  controller.getOrderDetail
);


// ==========================
// UPDATE ORDER STATUS (SELLER)
// ==========================
router.patch(
  "/seller/orders/:id/status",
  verifyToken,
  authorize(["seller"]),
  verifiedSeller,
  controller.updateOrderStatus
);

module.exports = router;