/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestoreDb} from "../firebase"; 
import PropTypes from "prop-types";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";
import { Timestamp } from "firebase/firestore"; // Import Timestamp

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, loading: false });
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(firestoreDb, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          createdAt: Timestamp.now(), // Firestore timestamp
        });
      }

      setAuthState({ user, loading: false });
    } catch (error) {
      console.error("Google sign-in error:", error?.message || error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null, loading: true }); // Ensure state resets properly
    } catch (error) {
      console.error("Logout error:", error?.message || error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, signInWithGoogle, logout }}>
      {!authState.loading && children} {/* Prevent UI flickering */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
