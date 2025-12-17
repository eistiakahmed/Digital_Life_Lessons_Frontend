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
googleProvider.addScope('email');
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState(null);
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
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const refreshedUser = auth.currentUser;

        const providerEmail = refreshedUser?.providerData?.[0]?.email;

        if (!refreshedUser.email && providerEmail) {
          console.warn('Email was null, using providerData email');
        }

        const finalUser = {
          ...refreshedUser,
          email: refreshedUser.email || providerEmail,
        };

        setUser(finalUser);

        // MongoDB fetch
        const finalEmail = finalUser.email;
        if (finalEmail) {
          try {
            await fetchUserData(finalEmail);
          } catch (error) {
            console.log('User not found in database, will be created on next sync');
            setUserDB(null);
          }
        }
      } else {
        setUser(null);
        setUserDB(null);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);


  
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
