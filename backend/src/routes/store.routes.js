const router =
  require("express").Router();

const controller =
  require("../controllers/store.controller");

const {
  verifyToken,
  authorize
} = require("../middlewares/auth.middleware");

const upload =
  require("../middlewares/upload.middleware");


// ==========================
// CREATE STORE REQUEST
// ==========================
router.post(
  "/",
  verifyToken,
  authorize(["seller"]),
  controller.createStoreRequest
);


// ==========================
// GET MY STORE
// ==========================
router.get(
  "/my-store",
  verifyToken,
  authorize(["seller"]),
  controller.getMyStore
);


// ==========================
// UPDATE STORE
// ==========================
router.put(
  "/my-store",
  verifyToken,
  authorize(["seller"]),
  upload.single("logo"),
  controller.updateStore
);


module.exports = router;