import  { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase'; // Make sure to configure Firebase in this file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [extraInfo, setExtraInfo] = useState({
    bio: '',
    location: '',
    contact: '',
    role: 'customer',
  });

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtraInfo({
      ...extraInfo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await createExtraInfo({
        uid: user.uid,
        ...extraInfo,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <p className="text-lg">{user.displayName}</p>
      </div>
      {editMode ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio:</label>
            <input
              type="text"
              name="bio"
              value={extraInfo.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact:</label>
            <input
              type="text"
              name="contact"
              value={extraInfo.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={extraInfo.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <input
              type="text"
              name="role"
              value={extraInfo.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;