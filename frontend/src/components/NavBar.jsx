import { useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";
import { AuthContext } from "../context/AuthContext";


const NavBar = () => {
  const { authState } = useContext(AuthContext);
  const {user} =authState;
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
        <Link
            to="/upload"
            className="hidden md:flex text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
          >
            upload
          </Link>
          <Link
            to="/order"
            className="hidden md:flex text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
          >
            ORDER
          </Link>
          <Link
            to="/dishes"
            className="hidden md:flex text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
          >
            DISHES
          </Link>
          {!user && (
            <>
              <Link
                to="/signup"
                className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
              >
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <Logout />
              <Link
                to="/profile"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-900 transition-colors shadow-xl p-2 sm:w-8 sm:h-8 md:w-10 md:h-10"
              >
                👤
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
