import  { useState, useEffect } from 'react';
import { firestoreDb } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Chat from './Chat';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersCollection = collection(firestoreDb, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    }
    fetchUsers();
  }, []);

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

  const handleBackClick = () => {
    setSelectedUserId(null); // Clear selected user to go back to list
  };

  return (
    <div className="flex flex-col h-screen">
      {selectedUserId ? (
        // Chat View
        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={handleBackClick}
            className="mb-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Back to Users
          </button>
          <Chat receiverId={selectedUserId} />
        </div>
      ) : (
        // User List View
        <div className="p-4 border-b">
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
      )}
    </div>
  );
}

export default UserList;