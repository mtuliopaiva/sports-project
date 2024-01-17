import { db } from "../firebase/config";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  const auth = getAuth();

  const login = async (data) => {
    setLoading(true);
    setError(false);
    console.log(data);
  
    try {
      if (!data.email || !data.password) {
        throw new Error("Email and password are required.");
      }
  
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    auth,
    login,
  };
};