const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

// Routes
router.post("/", createTransaction);
router.get("/", getTransactions);

module.exports = router;
