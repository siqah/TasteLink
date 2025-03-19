import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db, messaging, onMessage } from './FirebaseConfig';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Setup message listener
  useEffect(() => {
    if (!selectedChat) return;
    
    const messagesRef = collection(db, `chats/${selectedChat}/messages`);
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [selectedChat]);

  // Setup chat list listener
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.uid) return;

    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, []);

  // Setup notifications
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body
      });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (text) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    await addDoc(collection(db, `chats/${selectedChat}/messages`), {
      text,
      senderId: user.uid,
      timestamp: serverTimestamp()
    });

    await updateDoc(doc(db, 'chats', selectedChat), {
      lastMessage: text,
      timestamp: serverTimestamp()
    });
  };

  return (
    <ChatContext.Provider value={{ chats, messages, selectedChat, setSelectedChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => useContext(ChatContext);

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
