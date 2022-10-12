import React, { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();
const defaultValue = {
  session_ID: '', token: ''
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = () => {
      if (sessionStorage.getItem('user') === null) {
        setUser(defaultValue);
      } else {
        setUser(sessionStorage.getItem('user'));
      }
      setLoading(false);
    };
    return () => {
      unsubscribed()
    }
  }, [])

  if (!loading) {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
  }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
