// useAuthentication.js
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    auth,
    login,
    error,
    loading,
  };
};
