import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Beforelogin = () => {  
  return (
    <section className="flex bg-cover bg-center h-screen w-full bg-orange-900">
      <div className="bg-opacity-50 w-full h-full flex flex-col justify-center items-center px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 text-center">
          Find the Perfect Chef for Any Occasion
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 text-center">
          Explore and book top chefs to create culinary experiences right in
          your kitchen and events.
        </p>
        <div>
          <Link to="/home">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl shadow-md rounded-md bg-orange-700 p-3 sm:p-4 text-center">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

Beforelogin.propTypes = {
  children: PropTypes.node,
};

export default Beforelogin;
