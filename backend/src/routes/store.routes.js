const router = require("express").Router();

const controller = require("../controllers/store.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

// seller request store
router.post("/", verifyToken, controller.createStoreRequest);

// get my store
router.get("/me", verifyToken, controller.getMyStore);

module.exports = router;