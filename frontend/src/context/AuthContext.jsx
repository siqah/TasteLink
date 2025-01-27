import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user:null, loading: true });

  // Persist authentication state (auto login when app reloads)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, loading: false });
    });
    return () => unsubscribe(); // Clean up listener
  }, []);

  // Signup Function
  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optional: Update user's display name
      await updateProfile(user, { displayName: name });

      setAuthState({ user });
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
  };


  // Login Function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthState({ user: userCredential.user });
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  // Password Reset Function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      console.error("Password reset error:", error.message);
      throw error;
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null });
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      authState, 
      signup, 
      login, 
      resetPassword, 
      logout 
    }}>
      {!authState.loading && children} {/* Prevent app render before auth state is known */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
