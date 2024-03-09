const Review = require("../models/reviewModel");
const models = require("../models");

const addReview = async (req, res) => {
  try {
    const { rating, comment, userId, workerId } = req.body;

    const review = await models.Review.create({
      rating,
      comment,
      userId,
      workerId,
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Ulasan berhasil ditambahkan",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await models.Review.findAll();
    res.status(200).json({
      success: true,
      data: reviews,
      message: "Semua ulasan berhasil diambil",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await models.Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Ulasan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
      message: "Ulasan berhasil diambil",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getAllReviews, getReviewById, addReview };
