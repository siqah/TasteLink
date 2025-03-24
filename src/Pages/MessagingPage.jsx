import { useState, useEffect } from 'react';
import { firestoreDb } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Chat from '../components/Chat';
import { useAuth } from '../context/AuthContext';

function MessagingPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { authState } = useAuth();
  const { user } = authState;
  const currentUser = user;

  useEffect(() => {
    async function fetchUsers() {
      const usersCollection = collection(firestoreDb, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(usersData);
      setFilteredUsers(usersData);
    }
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen"> {/* Horizontal Flex */}
      <div className="w-1/4 p-4 border-r"> {/* User List (Left) */}
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-md p-2 mb-4 w-full focus:outline-none"
        />
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
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
        <div className="flex-1 overflow-y-auto p-4"> {/* Chat Area (Right) */}
          <Chat receiverId={selectedUserId} />
        </div>
      )}
    </div>
  );
}

export default MessagingPage;