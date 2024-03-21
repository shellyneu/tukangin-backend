const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

// Routes
router.post("/:tukangId/:jobId", authentication, createTransaction);
router.get("/", authentication, getTransactions);

module.exports = router;
