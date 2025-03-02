/* eslint-disable react/prop-types */
import { likePost } from "../api/post";

const PostsCard = ({ post }) => {
  return (
    <>
       <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md my-4 w-[300px] h-[400px]">
        <img src={post.imageUrl} alt="Post" className="w-full h-64 object-cover" />
        <div className="p-4">
            <p className="text-gray-800 text-sm mb-2">{post.description}</p>
            <div className="flex justify-between items-center mt-4">
                <button onClick={() => likePost(post.id)} className="text-red-500 focus:outline-none">
                    ❤️
                </button>
                <button className="text-gray-500 focus:outline-none">
                    💬
                </button>
                <button className="text-gray-500 focus:outline-none">
                    🔗
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default PostsCard
