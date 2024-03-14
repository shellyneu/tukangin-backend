const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authMiddleware");
const {
  createPostJob,
  getPostJobs,
  getPostJobById,
  updatePostJob,
  deletePostJob,
  getPostJobsByCategory,
} = require("../controllers/postJobController");

// Routes
router.post("/", createPostJob);
router.get("/", getPostJobs);
router.get("/:id", getPostJobById);
router.put("/:id", updatePostJob);
router.delete("/:id", deletePostJob);
router.get("/category/:category", getPostJobsByCategory);

module.exports = router;
