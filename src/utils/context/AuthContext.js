import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function resetPasswordEmail(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserPassword(password) {
    updatePassword(user, password)
  }

  function updateUserEmail(email) {
    updateEmail(user, email)
  }

  async function updateUserName(name) {
    await updateProfile(user, {
      displayName: name
    })
  }

  async function updateUserPhoto(photo) {
    await updateProfile(user, {
      photoURL: photo
    })
  }

  function logOut() {
    return signOut(auth);
  }


  const value = {
    user,
    logIn,
    signUp,
    logOut,
    resetPasswordEmail, 
    updateUserPassword, 
    updateUserEmail, 
    updateUserName,
    updateUserPhoto 
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        setLoading(false)
        setUser(currentuser);

        if(currentuser) {
          setDoc(doc(db, 'users', currentuser.uid), {
            userId: currentuser.uid,
            email: currentuser.email,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL
        })
        }
        
        
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <userAuthContext.Provider
      value={value}
    >
      {!loading && children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
