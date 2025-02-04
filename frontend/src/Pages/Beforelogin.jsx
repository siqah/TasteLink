import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import PropTypes from "prop-types";

const Beforelogin = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user is authenticated, redirect to the home page
  if (user) {
    return <Navigate to="/" />;
  }

  // Render the landing page with the 'Get Started' button
  return (
    <section className="flex bg-cover bg-center h-screen w-full bg-orange-900">
      <div className="bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-bold mb-4">
          Find the Perfect Chef for Any Occasion
        </h1>
        <p className="text-xl text-white mb-8">
          Explore and book top chefs to create culinary experiences right in
          your kitchen and events.
        </p>
        <div>
          <Link to="/home">
            <div className="text-white text-4xl shadow-md rounded-md bg-orange-700 p-4">
              Get Started
            </div>
          </Link>
        </div>
      </div>
      {/* Render children if there are additional components to display */}
      {children && <div>{children}</div>}
    </section>
  );
};

Beforelogin.propTypes = {
  children: PropTypes.node,
};

export default Beforelogin;
