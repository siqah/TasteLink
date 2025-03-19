/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import { FcLike } from "react-icons/fc";

const PostCard = ({ posts }) => {
  return (
    <div className="  max-auto  grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg mb-6 w-full  max-w-sm md:max-w-md lg:max-w-lg mx-auto "
        >
          <div className="flex justify-between items-center mb-4">
            <Link to={`/profile/${post.userId}`} className="flex items-center">
              <img
                src={post.userPhotoURL}
                alt="User"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 object-cover"
              />
              <p className="font-semibold text-sm sm:text-base md:text-lg">{post.username}</p>
            </Link>
          </div>

          <p className="mb-4 text-gray-700 text-sm sm:text-base">{post.caption}</p>

          {/* Post Image */}
          {post.imageBase64 && (
            <img
              src={post.imageBase64}
              alt="Post"
              className="w-full h-auto max-h-60 object-cover rounded-lg mb-4"
            />
          )}

          {/* Like Button */}
          {/* <div className="flex items-center">
            <button className="flex items-center mr-2 text-red-500">
              <FcLike className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <p className="text-gray-600">{post.likes.length}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default PostCard;
