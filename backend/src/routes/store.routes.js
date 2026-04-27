const express = require("express");
const router = express.Router();
const controller = require("../controllers/store.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize(["seller"]), controller.createStore);
router.get("/me", verifyToken, authorize(["seller"]), controller.getMyStore);

module.exports = router;