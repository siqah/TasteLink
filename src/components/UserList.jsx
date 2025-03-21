import  { useState, useEffect } from 'react';
import { firestoreDb} from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Chat from './Chat';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const usersCollection = collection(firestoreDb, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedUserId && (
        <div className="flex-1 overflow-y-auto p-4">
          <Chat receiverId={selectedUserId} />
        </div>
      )}
    </div>
  );
}

export default UserList;

