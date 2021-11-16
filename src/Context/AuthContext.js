import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  function reset(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout(email, password) {
    return auth.signOut();
  }
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  const store = {
    user,
    signup,
    login,
    logout,
    reset,
  };
  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
