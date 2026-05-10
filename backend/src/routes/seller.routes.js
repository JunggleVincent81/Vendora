const router = require("express").Router();
const controller = require("../controllers/seller.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/analytics", verifyToken, controller.getSellerAnalytics);

module.exports = router;