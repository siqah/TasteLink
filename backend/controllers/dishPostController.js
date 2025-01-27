const { resolve6 } = require("dns");
const DishPost = require("../models/DishPost");
const fs = require("fs");

// Create a new dish post
const createDishPost = async (req, res) => {
  try {
    const { description, creator, image, title } = req.body; // Destructure image (Cloudinary URL)

    if (!image) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    // Create a new post with the image URL
    const newPost = new DishPost({
      description,
      creator,
      title,
      image, // Use the Cloudinary URL
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating dish post:", error.message); // Log the error message
    res.status(500).json({ error: "Failed to create dish post" });
  }
};

// Get all dish posts
const getAllDishPosts = async (req, res) => {
  try {
    const posts = await DishPost.find().populate("creator tags"); // Populate creator and tags
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching dish posts:", error.message); // Log the error
    res.status(500).json({ error: "Failed to get dish posts" });
  }
};

const deleteDishPost = async (req, res) => {
  try {
    const post = await DishPost.findByIdAndDelete(req.params.id); // Finds and deletes the post in one step
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish post:", error.message);
    res.status(500).json({ error: "Failed to delete dish post" });
  }
};

// Tag a user in a dish post
const tagUserInDishPost = async (req, res) => {
  try {
    const post = await DishPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.tags.push(req.body.userId); // Push the new tag (userId) to the tags array
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error tagging user in dish post:", error.message); // Log the error
    res.status(500).json({ error: "Failed to tag user in post" });
  }
};

module.exports = {
  createDishPost,
  getAllDishPosts,
  tagUserInDishPost,
  deleteDishPost,
};
