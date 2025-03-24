// components/Notifications/Notifications.jsx
import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { firestoreDb } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import NotificationItem from './NotificationItem';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { authState } = useAuth();
  const { user } = authState;
  const currentUser = user;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(firestoreDb, 'messages'),
      where('receiverId', '==', currentUser.uid),
      where('read', '==', false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(items);
      setUnreadCount(items.length);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleNotificationClick = async (notification) => {
    try {
      await updateDoc(doc(firestoreDb, 'messages', notification.id), {
        read: true,
      });
      navigate(`/chat/${notification.senderId}`); // Navigate to chat room
      setIsOpen(false); // Close the dropdown
    } catch (error) {
      console.error('Error marking message as read and navigating:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell size={24} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5 transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Messages</h3>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No new messages</div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)} // Use handleNotificationClick
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;