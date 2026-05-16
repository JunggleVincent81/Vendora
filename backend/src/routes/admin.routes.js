const router = require("express").Router();

const controller =
  require("../controllers/admin.controller");

const {
  verifyToken,
  authorize
} = require("../middlewares/auth.middleware");


// ==========================
// MIDDLEWARE
// ==========================
const adminMiddleware = [
  verifyToken,
  authorize(["admin"])
];


// ==========================
// DASHBOARD
// ==========================
router.get(
  "/dashboard",
  ...adminMiddleware,
  controller.getDashboard
);

router.get(
  "/dashboard/stats",
  ...adminMiddleware,
  controller.getDashboardStats
);


// ==========================
// USERS
// ==========================
router.get(
  "/users",
  ...adminMiddleware,
  controller.getAllUsers
);

router.patch(
  "/users/:id/status",
  ...adminMiddleware,
  controller.updateUserStatus
);


// ==========================
// STORES
// ==========================
router.get(
  "/stores",
  ...adminMiddleware,
  controller.getAllStores
);

router.patch(
  "/stores/:id/status",
  ...adminMiddleware,
  controller.updateStoreStatus
);


// ==========================
// PRODUCTS
// ==========================
router.get(
  "/products",
  ...adminMiddleware,
  controller.getAllProducts
);

router.patch(
  "/products/:id/status",
  ...adminMiddleware,
  controller.updateProductStatus
);


// ==========================
// ORDERS
// ==========================
router.get(
  "/orders",
  ...adminMiddleware,
  controller.getAllOrders
);

router.get(
  "/orders/:id",
  ...adminMiddleware,
  controller.getAdminOrderDetail
);


// ==========================
// ANALYTICS
// ==========================
router.get(
  "/analytics",
  ...adminMiddleware,
  controller.getAnalytics
);

router.get(
  "/analytics/revenue",
  ...adminMiddleware,
  controller.getRevenueAnalytics
);

router.get(
  "/analytics/top-products",
  ...adminMiddleware,
  controller.getTopProducts
);

router.get(
  "/analytics/top-sellers",
  ...adminMiddleware,
  controller.getTopSellers
);

router.get(
  "/analytics/order-status",
  ...adminMiddleware,
  controller.getOrderStatusAnalytics
);

router.get(
  "/analytics/user-growth",
  ...adminMiddleware,
  controller.getUserGrowth
);


module.exports = router;