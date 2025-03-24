// components/Notifications/NotificationsPage.jsx (Rename to NotificationsPage)
import { useState, useEffect } from 'react';
import { firestoreDb } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationItem from '../components/Notifications/NotificationItem';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { authState } = useAuth();
  const { user } = authState;
  const currentUser = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(firestoreDb, 'messages'),
      where('receiverId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(items);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleNotificationClick = async (notification) => {
    try {
      await updateDoc(doc(firestoreDb, 'messages', notification.id), {
        read: true,
      });
      navigate(`/chat/${notification.senderId}`);
    } catch (error) {
      console.error('Error marking message as read and navigating:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="max-h-[80vh] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No messages</div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => handleNotificationClick(notification)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

