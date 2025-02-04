import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, loading: true });

  // Persist authentication state (auto login when app reloads)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, loading: false });
    });
    return () => unsubscribe(); // Clean up listener
  }, []);

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthState({ user: result.user });
    } catch (error) {
      console.error("Google sign-in error:", error.message);
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
      signInWithGoogle, 

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
