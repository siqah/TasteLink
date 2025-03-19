import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase";



export const startConversation = async (userId1, userId2) => {
  if (!userId1 || !userId2) {
    console.error("Invalid user IDs provided:", { userId1, userId2 });
    throw new Error("User IDs must be defined.");
  }

  const conversationsRef = collection(firestoreDb, "conversations");

  console.log("Starting query with userId1:", userId1, "userId2:", userId2);

  const q = query(
    conversationsRef,
    where("participants", "array-contains", userId1)
  );
  
  try {
    const querySnapshot = await getDocs(q);
    let conversation = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(userId2)) {
        conversation = { id: doc.id, ...data };
      }
    });

    if (!conversation) {
      console.log("No existing conversation, creating new one...");
      const newConversation = {
        participants: [userId1, userId2],
        lastMessage: "",
      };
      const docRef = await addDoc(conversationsRef, newConversation);
      conversation = { id: docRef.id, ...newConversation };
    }

    return conversation;
  } catch (error) {
    console.error("Error querying Firestore:", error);
    throw error;
  }
};
