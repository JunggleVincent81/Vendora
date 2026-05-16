const express = require("express");
const router = express.Router();

const controller =
  require("../controllers/user.controller");

const {
  verifyToken
} = require("../middlewares/auth.middleware");

const upload =
  require("../middlewares/upload.middleware");


// PROFILE
router.get(
  "/me",
  verifyToken,
  controller.getMyProfile
);

router.put(
    "/profile",
    verifyToken,
    upload.single("avatar"),
    controller.updateProfile
  );


// PASSWORD
router.put(
  "/password",
  verifyToken,
  controller.updatePassword
);

module.exports = router;