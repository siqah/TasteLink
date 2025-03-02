/* eslint-disable react-hooks/exhaustive-deps */
import { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;



  return (
    <div className="">
      {user && (
        <>
          <div className="flex items-center  space-x-1 sm:space-x-2 md:space-x-2 h-full">
            <div className="ml-2 mt-2">
            <Link to="/profile">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="rounded-full w-10 h-10 object-cover border border-gray-300"
                />
              </Link>
            </div>
            <div className="mt-4 mb-2">
              <p className="text-lg">
                {user.displayName || "No Name Available"}
              </p>
            </div>
          </div>
           <div className="mt-4 ml-2">
            <Link>
               <h1>Messages</h1>
            </Link>
           </div>
        
        </>
      )}
    </div>
  );
};

export default Sidebar;
