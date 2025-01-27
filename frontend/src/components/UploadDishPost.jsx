import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

const UploadDishPost = () => {
  const { setPosts } = useContext(PostContext); // Use context for setPosts
  const { authState } = useContext(AuthContext); // Use AuthContext for user data
  const {user} = authState;
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      alert("Please select a valid image");
    }
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "fxxa3jjn"); // Cloudinary preset
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dz3met9lc/image/upload", // Cloudinary URL
        formData
      );
      return response.data.secure_url; // Return the Cloudinary image URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Error uploading image to Cloudinary");
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Please select an image");
      return;
    }
  
    if (!user?.user) {
      alert("User not authenticated");
      return;
    }
  
    setIsUploading(true);
  
    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(image);
  
      // Then upload post details to the backend
      const postData = {
        image: imageUrl,  // Use the Cloudinary URL
        description,
        creator: user.displayName,
        title,
      };
  
      const response = await axios.post(
        "http://localhost:5000/api/dishposts",
        postData
      );
  
      setPosts((prevPosts) => [response.data, ...prevPosts]); // Update posts in context
      setDescription("");
      setImage(null);
      setIsUploading(false);
      setTitle("");
      
    } catch (error) {
      console.error("Error uploading post:", error.response?.data || error.message);
      setIsUploading(false);
      alert("Error uploading post, please try again");
    }
  };
  

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md justify-center items-center"
      >
        <Link to={"/"}>
          <div className="sm:mt-6 text-orange-600">Home</div>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 justify-center items-center ml-10">
          Upload a new dish post
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
            Upload Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {image && <p className="mt-2 text-sm text-gray-600">{image.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default UploadDishPost;
