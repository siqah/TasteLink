import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { addExtraInfo, getExtraInfo, uploadProfileImage, getProfileImage } from "../api/extraInfo";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [extraInfo, setExtraInfo] = useState({
    bio: "",
    location: "",
    contact: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");

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
          const profileImgUrl = await getProfileImage(user.uid);
          setProfileImage(profileImgUrl || "images");
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

  const handleImageUpload = async (event) => {
    if (!user) return;
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(user.uid, file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

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
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4 text-center">
        <label className="block text-gray-700">Profile Picture:</label>
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border border-gray-300"
        />
       
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <p className="text-lg">{user.displayName || "No Name Available"}</p>
      </div>
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
        <p className="text-lg">{extraInfo.role || "customer"}</p>
      </div>
      {editMode ? (
        <div>
           <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
          <input
            type="text"
            name="bio"
            value={extraInfo.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            value={extraInfo.contact}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={extraInfo.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="role"
            value={extraInfo.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
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
