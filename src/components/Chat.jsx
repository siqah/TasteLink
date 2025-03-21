/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { firestoreDb } from '../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp, // Import serverTimestamp
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function Chat({ receiverId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const { authState } = useAuth();
  const { user } = authState;
  const currentUser = user;
  
  

  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser) {
        console.error('User is not authenticated.');
        return; 
      }

    const messagesRef = collection(firestoreDb, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (message) =>
            (message.senderId === currentUser.uid && message.receiverId === receiverId) ||
            (message.senderId === receiverId && message.receiverId === currentUser.uid)
        );
      setMessages(messagesData);
      scrollToBottom();
      readMessages(messagesData);
    });

    return () => unsubscribe();
  }, [currentUser, receiverId]); 

  const readMessages = async (messagesData) => {
    messagesData.forEach(async (message) => {
      if (message.receiverId === currentUser.uid && message.read === false) {
        const messageRef = doc(firestoreDb, 'messages', message.id);
        await updateDoc(messageRef, { read: true });
      }
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!currentUser || !newMessage.trim()) return;

    await addDoc(collection(firestoreDb, 'messages'), {
      senderId: currentUser.uid,
      receiverId: receiverId,
      text: newMessage,
      timestamp: serverTimestamp(), 
      read: false,
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
<div className="flex-1 overflow-y-auto p-4 space-y-2">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`p-2 rounded-lg ${
        message.senderId === currentUser.uid
          ? 'bg-blue-100 self-end'
          : 'bg-gray-100 self-start'
      }`}
    >
      {message.text}
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>
<div className="p-4 border-t flex">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 border rounded-l-md p-2 focus:outline-none"
  />
  <button
    onClick={sendMessage}
    className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
  >
    Send
  </button>
</div>
</div>
  );
}

export default Chat;

