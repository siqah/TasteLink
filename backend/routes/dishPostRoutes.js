const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImageToCloudinary,
} = require("../middlewares/cloudinary");
const {
  createDishPost,
  getAllDishPosts,
  deleteDishPost,
  tagUserInDishPost,
} = require("../controllers/dishPostController");

// Create a new dish post
router.post(
  "/",
  upload.single("image"),
  uploadImageToCloudinary,
  createDishPost
);

// Get all dish posts
router.get("/", getAllDishPosts);

// Delete a dish post
router.delete("/:id", deleteDishPost);

// Tag a user in a post
router.post("/:id/tag", tagUserInDishPost);

module.exports = router;
