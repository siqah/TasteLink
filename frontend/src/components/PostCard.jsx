/* eslint-disable react/prop-types */

const PostCard = ({ posts }) => {
  return (
    <>
      {/* <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md my-4 w-[300px] h-[400px]">
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-800 text-sm mb-2">{post.description}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => likePost(post.id)}
              className="text-red-500 focus:outline-none"
            >
              ❤️
            </button>
            <button className="text-gray-500 focus:outline-none">💬</button>
            <button className="text-gray-500 focus:outline-none">🔗</button>
          </div>
        </div>
      </div> */}
        {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center mb-2">
            <img src={post.userPhotoURL} alt="User" className="w-10 h-10 rounded-full mr-2" />
            <p className="font-semibold">{post.username}</p>
          </div>
          <p className="mb-2">{post.caption}</p>
          {post.imageBase64 && <img src={post.imageBase64} alt="Post" className="w-full rounded-lg" />}
        </div>
      ))}
    </>
  );
};

export default PostCard;
