import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import ChefOrders from "./ChefOrders";
// import CreateOrder from "./CreateOrder";
import axios from "axios";

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState; // Destructure user from authState

  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem("profileData");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.displayName : "",
    email: user ? user.email : "",
    contact: "",
    location: "",
    role: "",
  });

  // Fetch contact, location, and role from backend API
  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
        try {
          // Firebase profile data
          const firebaseProfile = {
            name: user.displayName,
            email: user.email,
          };
  
          // Fetch additional profile data from the backend using Firebase UID
          const response = await axios.get(
            `http://localhost:5000/api/users/${user.uid}`, // Use uid from Firebase
            { headers: { Authorization: `Bearer ${user.accessToken}` } }
          );
          const { contact, location, role } = response.data;
  
          const fullProfile = {
            ...firebaseProfile,
            contact,
            location,
            role
          };
  
          // Save combined profile to state
          setProfileData(fullProfile);
          setFormData(fullProfile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchProfile();
    }
  }, [user]);
  
    

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload (example, in case you need it)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", file);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/profileImage`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`, // Firebase token
            uid: user.uid, // Send Firebase UID
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  // Save profile changes
  const handleSave = async () => {
    try {
      // Update contact, location, and role in your backend
      const backendResponse = await axios.put(
        `http://localhost:5000/api/users/${user.uid}`,
        {
          contact: formData.contact,
          location: formData.location,
          role: formData.role,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      // Optionally save backend data in profileData
      setProfileData((prevData) => ({
        ...prevData,
        contact: backendResponse.data.contact,
        location: backendResponse.data.location,
        role: backendResponse.data.role,
      }));

      // Update name and email in Firebase (if they've been edited)
      if (formData.name !== user.displayName || formData.email !== user.email) {
        await user.updateProfile({ displayName: formData.name });
        // If email needs updating, make sure to call user.updateEmail as well
      }

      setEditMode(false);

      // Save updated profile data to local storage
      localStorage.setItem("profileData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileData)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 items-center justify-center shadow-md rounded-lg">
      <div className="container mx-auto flex justify-between items-center text-2xl sm:text-3xl font-bold sm:mb-6">
        <Link to={"/"}>
          <div className="shadow-lg rounded-md mt-2 sm:mt-6 text-orange-600">Home</div>
        </Link>
        <h1 className="hidden md:flex">Profile</h1>
        <div>
          {editMode ? (
            <button
              onClick={handleSave}
              className="flex mt-2 sm:mt-6 text-orange-600 py-2 px-4 rounded-md shadow-md"
            >
              SAVE
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 sm:mt-6 text-orange-600  py-2 px-4 rounded-lg shadow-lg xl:hidden"
            >
              edit
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center rounded-md shadow-sm p-4">
          <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden bg-orange-900">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-center text-orange-700">{formData.name}</p>
            )}
          </div>
        </div>

        {editMode && <input type="file" onChange={handleImageChange} className="text-gray-700" />}

        <div className="p-4 rounded-md shadow-md mb-3">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded-md"
            />
          ) : (
            <p className="w-full text-gray-700">{profileData.name}</p>
          )}
        </div>

        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">CONTACT:</h2>
          {editMode ? (
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <p className="text-gray-700">{profileData.contact}</p>
          )}
        </div>

        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">LOCATION:</h2>
          {editMode ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <p className="text-gray-700">{profileData.location}</p>
          )}
        </div>
      </div>

      {/* {profileData.role === "chef" ? <ChefOrders /> : <CreateOrder />} */}
    </div>
  );
};

export default Profile;
