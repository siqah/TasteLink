// import { useState, useEffect, useContext } from "react";import { useEffect, useState } from "react";
import{useEffect, useState} from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";
import PostCard from "./PostCard";

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
      <PostCard posts={posts}/>
    </div>
  );
};

export default DisplayPosts;
