import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const defaultValue = {
  session_ID: '', token: ''
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleError = (status) => {
    if (status === 500) {
      alert('セッションが切れました。ログインし直してください');
      sessionStorage.removeItem('user');
      setUser(defaultValue);
    } else {
      alert(`エラーが発生しました。再度診断してください。エラーコード: ${status}`);
    };
    navigate('/');
  }

  useEffect(() => {
    const unsubscribed = () => {
      if (sessionStorage.getItem('user') === null) {
        setUser(defaultValue);
      } else {
        setUser(JSON.parse(sessionStorage.getItem('user')));
      }
      setLoading(false);
    };
    return () => {
      unsubscribed()
    }
  }, [])

  if (!loading) {
    return <AuthContext.Provider value={{ user, handleError }}>{children}</AuthContext.Provider>;
  }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
