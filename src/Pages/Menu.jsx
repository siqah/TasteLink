/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../auth/Logout";
import { FiHome, FiMessageSquare, FiBell, FiEdit3 } from "react-icons/fi";

const Menu = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 space-y-4">
      {user && (
        <>
          {/* Profile Section */}
          <div className="flex items-center space-x-3 border-b pb-3">
            <Link to="/profile">
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                className="rounded-full w-12 h-12 object-cover border border-gray-300"
              />
            </Link>
            <p className="text-lg font-semibold">{user.displayName || "User"}</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 text-gray-700">
            <Link to="/home" className="flex items-center space-x-2 hover:text-orange-600 transition">
              <FiHome className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/createpost" className="flex items-center space-x-2 hover:text-orange-600 transition">
              <FiEdit3 className="w-5 h-5" />
              <span>Create Post</span>
            </Link>
            <Link to="/messages" className="flex items-center space-x-2 hover:text-orange-600 transition">
              <FiMessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </Link>
            <Link to="/notifications" className="flex items-center space-x-2 hover:text-orange-600 transition">
              <FiBell className="w-5 h-5" />
              <span>Notifications</span>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="border-t pt-3">
            <Logout />
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
