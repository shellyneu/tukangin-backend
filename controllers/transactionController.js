const models = require("../models");
const asyncHandler = require("express-async-handler");

const validStatus = ["Pengajuan", "Pengerjaan", "Selesai"];

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { tukang, bukti, status, action } = req.body;
  const BuktiName = req.file ? req.file.filename : null;

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  const date = new Date();

  const transaction = await models.Transaction.create({
    tukang,
    date,
    bukti: `${process.env.BASE_URL}/bukti/${BuktiName}`,
    status,
    action,
  });

  res.status(201).json({
    success: true,
    data: transaction,
    message: "Transaction created successfully",
  });
});

// Get all transactions
const getTransactions = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};

  if (status && validStatus.includes(status)) {
    filter.status = status;
  }

  const transactions = await models.Transaction.findAll();
  res.status(200).json({
    success: true,
    data: transactions,
    message: "All transactions retrieved successfully",
  });
});

module.exports = {
  createTransaction,
  getTransactions,
};
