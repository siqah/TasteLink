import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ContentBelowNav = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  return (
    <div className=" constainer max-auto p-3 shadow-lg space-x-2 justify-between items-center lg:hidden md:hidden ">
      <Link
        to="/upload"
        className="lg:hidden md:flex text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
      >
        upload
      </Link>
      <Link
        to="/order"
        className="lg:hidden md:hidden text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 "
      >
        ORDER
      </Link>
      <Link
        to="/dishes"
        className="lg:hidden md:hidden text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2"
      >
        DISHES
      </Link>

      {user && (
        <>
          <Link
            to="/signup"
            className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default ContentBelowNav;
