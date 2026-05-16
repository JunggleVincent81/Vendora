const express = require("express");
const upload = require("../config/multer");
const verifiedSeller = require("../middlewares/verifiedSeller.middleware");
const router = express.Router();

const controller = require("../controllers/product.controller");


const {
  verifyToken,
  authorize
} = require("../middlewares/auth.middleware");

// PUBLIC
router.get("/", controller.getAllProducts);

// SELLER
router.post(
    "/",
    verifyToken,
    authorize(["seller"]),
    verifiedSeller,
    upload.single("image"),
    controller.createProduct
  );

router.put(
  "/:id",
  verifyToken,
  authorize(["seller"]),
  controller.updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  authorize(["seller"]),
  controller.deleteProduct
);

// ==========================
// PUBLIC PRODUCTS
// ==========================
router.get(
  "/public",
  controller.getPublicProducts
);

router.get(
  "/public/:id",
  controller.getProductDetail
);

module.exports = router;