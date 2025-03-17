import { useEffect, useState } from "react";
import {  collection, getDocs, query, where } from "firebase/firestore";
import ChefCard from "./ChefCard";
import { firestoreDb} from "../firebase"; 

const Chefs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const q = query(collection(firestoreDb, "users"), where("role", "==", "chef"));
        const usersSnapshot = await getDocs(q);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="space-y-4">
      {users.length > 0 ? (
        users.map((user) => <ChefCard key={user.id} user={user} />)
      ) : (
        <p>No chefs found.</p>
      )}
    </div>
  );
};

export default Chefs;