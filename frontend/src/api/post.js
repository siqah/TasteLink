import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, "posts"));
        const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default DisplayPosts;
