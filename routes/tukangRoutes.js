const express = require("express");
const router = express.Router();
const multer = require("multer");
const { validateTukangAccount } = require("../controllers/tukangController");
const { authentication } = require("../middleware/authMiddleware");

router.post("/validate-account", authentication, validateTukangAccount);

module.exports = router;
