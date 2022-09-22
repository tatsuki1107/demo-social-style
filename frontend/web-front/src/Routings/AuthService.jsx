import React, { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();
const defaultValue = {
  session_ID: '', token: ''
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue);

  const createUser = (sessionId) => {
    // 仮トークン発行
    const random = Math.random().toString(32).substring(2)
    sessionStorage.setItem("user", JSON.stringify({ session_ID: sessionId, token: random }));
    setUser({ session_ID: sessionId, token: random });
  };

  useEffect(() => {
    const unsubscribed = () => {
      if (sessionStorage.getItem('user') === null) {
        setUser(defaultValue);
      } else {
        setUser(sessionStorage.getItem('user'));
      }
    };
    return () => {
      unsubscribed()
    }
  }, [])

  // if (!loading) {
  return <AuthContext.Provider value={{ user, createUser }}>{children}</AuthContext.Provider>;
  // }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
