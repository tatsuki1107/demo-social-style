import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleError = (status) => {
    if (status === 500) {
      alert('セッションが切れました。ログインし直してください');
      sessionStorage.removeItem('user');
      setUser();
    } else {
      alert(`エラーが発生しました。再度診断してください。エラーコード: ${status}`);
    };
    navigate('/');
  }

  useEffect(() => {
     let query = new URLSearchParams(window.location.search);
    if (sessionStorage.getItem('user') != null){
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
    let session = query.get("session_id");
    let token = query.get("token");
    if (query.get("session_id") != null && query.get("token") != null){
      let dict = {session_id:session, token:token};
      console.log(dict);
      sessionStorage.setItem('user',JSON.stringify(dict));
      setUser(JSON.parse(sessionStorage.getItem('user')));
    　　setLoading(false);
    };
      setLoading(false);
  }, [])

  if (!loading) {
    return <AuthContext.Provider value={{ user, handleError }}>{children}</AuthContext.Provider>;
  }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
