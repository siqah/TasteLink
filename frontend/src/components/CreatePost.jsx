import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const CreatePost = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert image file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const base64Image = await convertToBase64(e.target.files[0]);
      setImage(base64Image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption) return alert("Please add an image and caption");

    setLoading(true);
    try {
      // Add post directly to Firestore with Base64 image
      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        username: user.displayName,
        userPhotoURL: user.photoURL || "/default-profile.png",
        imageBase64: image, // 🔥 Storing image as Base64
        caption,
        likes: [],
        timestamp: serverTimestamp(),
      });

      setCaption("");
      setImage(null);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Create a Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input type="file" onChange={handleImageChange} className="border p-2 rounded-md" />
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
