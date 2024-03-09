const express = require("express");
const router = express.Router();
const {
  addReview,
  getAllReviews,
  getReviewById,
} = require("../controllers/reviewController");

router.post("/add", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

module.exports = router;
