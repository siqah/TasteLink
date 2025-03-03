// import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <nav className="z-0 p-4 flex mx-auto h-min bg-white shadow-md sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center h-16">
        <Link
          to="/"
          className="text-orange-900 text-2xl font-bold md:text-xl sm:text-lg hover:text-red-950 transition-colors shadow-xl rounded-sm p-2"
        >
          TasteLink
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-2 md:space-x-4">
          {!user ? (
            <Link
              to="/signup"
              className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
            >
              SignIn
            </Link>
          ) : (
            <>
              <Link to="/profile">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="rounded-full w-10 h-10 object-cover border border-gray-300"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
