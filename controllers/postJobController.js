const models = require("../models");
const asyncHandler = require("express-async-handler");

const validCategories = ["pengecat", "saluran", "pasang", "lainnya"];
const validStatus = ["Rekrut", "Proses", "Selesai"];

// Create a new post job
const createPostJob = asyncHandler(async (req, res) => {
  const {
    titleJob,
    serviceCategory,
    address,
    link,
    price,
    day,
    listJob,
    desc,
    statusJob,
    tukang,
    applyTukang,
  } = req.body;
  const PhotoName = req.file ? req.file.filename : null;

  if (!validCategories.includes(serviceCategory)) {
    return res.status(400).json({
      success: false,
      message: "Invalid service category",
    });
  }

  if (!validStatus.includes(statusJob)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status job",
    });
  }

  try {
    const userId = req.user.id;
    const postJob = await models.PostJob.create({
      userId: userId,
      titleJob,
      serviceCategory,
      address,
      link,
      price,
      day,
      listJob,
      desc,
      statusJob,
      tukang,
      applyTukang,
      photo: `${process.env.BASE_URL}/postJob/${PhotoName}`,
    });

    res.status(201).json({
      success: true,
      data: postJob,
      message: "Post job created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all post jobs
const getPostJobs = asyncHandler(async (req, res) => {
  const { serviceCategory } = req.query;
  const filter = {};

  if (serviceCategory) filter.serviceCategory = serviceCategory;

  const postJobs = await models.PostJob.findAll();
  res.status(200).json({
    success: true,
    data: postJobs,
    message: "All post jobs retrieved successfully",
  });
});

// Get a post job by ID
const getPostJobById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const postJob = await models.PostJob.findByPk(postId);

  if (!postJob) {
    res.status(404).json({
      success: false,
      message: "Post job not found",
    });
  } else {
    const statusJob = postJob.statusJob[0];
    postJob.statusJob = statusJob;

    res.status(200).json({
      success: true,
      data: postJob,
      message: "Post job retrieved successfully",
    });
  }
});

// Update a post job by ID
const updatePostJob = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const updatedPostJob = await models.PostJob.update(req.body, {
    where: { id: postId },
  });

  if (updatedPostJob[0] === 0) {
    res.status(404).json({
      success: false,
      message: "Post job not found",
    });
  } else {
    const updatedPostJobData = await models.PostJob.findByPk(postId);
    const statusJob = updatedPostJobData.statusJob[0];
    updatedPostJobData.statusJob = statusJob;

    res.status(200).json({
      success: true,
      data: updatedPostJobData,
      message: "Post job updated successfully",
    });
  }
});

// Delete a post job by ID
const deletePostJob = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const deletedPostJob = await models.PostJob.destroy({
    where: { id: postId },
  });

  if (!deletedPostJob) {
    res.status(404).json({
      success: false,
      message: "Post job not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Post job deleted successfully",
    });
  }
});

// Get all post jobs by category
const getPostJobsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }

  const postJobs = await models.PostJob.findAll({
    where: {
      serviceCategory: category,
    },
  });

  res.status(200).json({
    success: true,
    data: postJobs,
    message: `All post jobs under category ${category}`,
  });
});

module.exports = {
  createPostJob,
  getPostJobs,
  getPostJobById,
  updatePostJob,
  deletePostJob,
  getPostJobsByCategory,
};
