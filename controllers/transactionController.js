const models = require("../models");
const asyncHandler = require("express-async-handler");

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const BuktiName = req.file ? req.file.filename : null;

  const date = new Date();

  const userId = req.user.id;
  const tukangId = req.params.tukangId;
  const jobId = req.params.jobId;
  if (!tukangId || !jobId) {
    return res.status(400).json({
      success: false,
      message: "Tukang ID and Job ID are required",
    });
  }

  const postJob = await models.PostJob.findByPk(jobId);
  const price = postJob.price;
  const price_admin = 2500;
  const price_total = price + price_admin;

  const transaction = await models.Transaction.create({
    userId: userId,
    tukangId: tukangId,
    jobId: jobId,
    date,
    price,
    price_admin: price_admin,
    price_total: price_total,
    bukti: `${process.env.BASE_URL}/bukti/${BuktiName}`,
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
