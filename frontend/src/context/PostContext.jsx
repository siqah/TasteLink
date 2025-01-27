import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Fetch all dish posts on component mount
  useEffect(() => {
    axios
      .get(`$http://localhost:5000/api/dishposts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Delete dish post function
  const deleteDishPost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/dishposts/${postId}`
      );

      if (response.status === 200) {
        // Remove the deleted post from the posts state
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, deleteDishPost }}>
      {children}
    </PostContext.Provider>
  );
};

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PostProvider, PostContext };
