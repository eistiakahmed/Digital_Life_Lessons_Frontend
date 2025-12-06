import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const[loading,setLoading] = useState(true)



  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };


  const LogoutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

   useEffect(() => {
     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
       setLoading(false);
      //  console.log(currentUser);
     });
     return () => {
       unSubscribe();
     };
   }, []);

  const authInfo = {
    createUser,
    signInUser,
    LogoutUser,
    user,
    loading,
    signInGoogle,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
