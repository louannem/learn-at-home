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
import { auth } from "../firebase";

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

  function updateUserName(name) {
    updateProfile(user, {
      displayName: name
    })
  }

  function updateUserPhoto(photo) {
    updateProfile(user, {
      photoURL: photo
    })
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        setLoading(false)
        setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, resetPasswordEmail, updateUserPassword, updateUserEmail, updateUserName, updateUserPhoto }}
    >
      {!loading && children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
