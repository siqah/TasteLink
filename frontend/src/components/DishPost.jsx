import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext'; 

 const  DishPost = () => {
  const { user } = useContext(AuthContext);  // Access authenticated user
  const { posts, deleteDishPost } = useContext(PostContext);  // Access deleteDishPost

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDishPost(postId);  // Call the delete function from context
    }
  };

    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="border rounded-lg overflow-hidden shadow-lg">
                <img src={post.image} alt="Image" className="w-64 h-64 object-cover" />
                <p className="text-gray-600">By: {user?.name || 'Unknown'}</p>
                <div className="p-4">
                  <p className="text-gray-600">By: {post.creator?.name || 'Unknown'}</p>
                  <h2 className="font-bold text-xl">{post.title}</h2>
                  <p className="font-bold text-lg">{post.description}</p>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</p>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white mt-4 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    );
    
  
};

export default DishPost;
