import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState(null); // MongoDB user data
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const LogoutUser = () => {
    setLoading(true);
    setUserDB(null);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Fetch user data from MongoDB
  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${email}`
      );
      setUserDB(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserDB(null);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        fetchUserData(currentUser.email);
      } else {
        setUserDB(null);
      }
      setLoading(false);
      //  console.log(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // Refresh user data function
  const refreshUserData = async () => {
    if (user?.email) {
      await fetchUserData(user.email);
    }
  };

  const authInfo = {
    createUser,
    signInUser,
    LogoutUser,
    user,
    userDB,
    loading,
    signInGoogle,
    updateUserProfile,
    refreshUserData,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
