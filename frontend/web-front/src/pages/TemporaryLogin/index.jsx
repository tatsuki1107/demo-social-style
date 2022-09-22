import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../Routings/AuthService";

// 選択可能な仮ユーザー
const items = ["ユーザー001", "ユーザー002", "ユーザー003"];

const TemporaryLogin = () => {
  const [cheerId, setCheerId] = useState('');
  const { user, createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = () => {
    createUser(cheerId);
    navigate('/diagnosis');
  };

  return (
    <>
      {user.token === "" ?
        <div>
          <h1>仮ログインページ（cheer careerのログインページだと思って）</h1>
          {items.map((item) => {
            return (
              <div key={item}>
                <input
                  id={item}
                  type="radio"
                  value={item}
                  onChange={(e) => setCheerId(e.target.value)}
                  checked={item === cheerId}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            )
          })}

          <button onClick={onSubmit}>ログイン</button>
        </div>
        : <Navigate to="/" />}

    </>
  );
};

export default TemporaryLogin;
