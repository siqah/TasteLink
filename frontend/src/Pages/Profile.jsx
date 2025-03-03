import { useState, useEffect,} from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { addExtraInfo, getExtraInfo } from "../api/extraInfo";
import { useAuth} from "../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { authState } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [extraInfo, setExtraInfo] = useState({
    bio: "",
    location: "",
    contact: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userExtraInfo = await getExtraInfo(user.uid);
          if (userExtraInfo) {
            setExtraInfo(userExtraInfo);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtraInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await addExtraInfo(user.uid, extraInfo);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {editMode ? (
        <div>
          <div className="flex justify-between">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Go Back
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
          <div className="mt-4 text-center">
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              value={extraInfo.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded mt-4"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={extraInfo.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded mt-4"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={extraInfo.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded mt-4"
            />
            <select
              name="role"
              value={extraInfo.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded mt-4"
            >
              <option value="customer">Customer</option>
              <option value="chef">Chef</option>
            </select>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Link to="/home">
              <h1 className="text-2xl font-bold">Home</h1>
            </Link>
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
          <div className="text-center">
            <img
              src={authState.user?.photoURL || "/tastelink.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full bg-gray-200 mx-auto"
            />
            <p className="mt-2 text-lg font-semibold">
              {authState.user?.displayName || "Anonymous User"}
            </p>
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Bio:</label>
              <p className="text-lg">{extraInfo.bio || "Not provided"}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact:</label>
              <p className="text-lg">{extraInfo.contact || "Not provided"}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location:</label>
              <p className="text-lg">{extraInfo.location || "Not provided"}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role:</label>
              <p className="text-lg">{extraInfo.role || "Customer"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
