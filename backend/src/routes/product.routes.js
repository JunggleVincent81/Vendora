const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize(["seller"]), controller.createProduct);
router.get("/", controller.getAllProducts);
router.put("/:id", verifyToken, authorize(["seller"]), controller.updateProduct);
router.delete("/:id", verifyToken, authorize(["seller"]), controller.deleteProduct);

module.exports = router;