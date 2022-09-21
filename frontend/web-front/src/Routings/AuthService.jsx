import React, { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();
const defaultValue = {
  cheer_Id: '', token: ''
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  const createUser = (cheerId) => {
    // 仮トークン発行
    const random = Math.random().toString(32).substring(2)
    sessionStorage.setItem("user", JSON.stringify({ cheer_Id: cheerId, token: random }));
  };

  useEffect(() => {
    const unsubscribed = () => {
      setUser(sessionStorage.getItem('user'));
      setLoading(false);
    };
    return () => {
      unsubscribed()
    }
  }, [])

  if (!loading) {
    return <AuthContext.Provider value={{ user, createUser }}>{children}</AuthContext.Provider>;
  }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
