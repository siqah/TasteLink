import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log("Signed in successfully");
      navigate("/home");
    } catch (error) {
      console.error("Sign in failed:", error?.message || error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <button
          onClick={handleSignIn}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Sign in with Google
        </button>
        <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded mt-4 hover:bg-gray-300 transition duration-300">
          <Link to="/home">Cancel</Link>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
