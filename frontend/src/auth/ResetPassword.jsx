import  { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PasswordReset = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      alert("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>
            <form onSubmit={handleReset} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? "Sending..." : "Reset Password"}
                    </button>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
        </div>
    </div>
);
};

export default PasswordReset;
