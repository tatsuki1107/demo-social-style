import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../Routings/AuthService";

// 選択可能な仮ユーザー
const items = ["ユーザー001", "ユーザー002", "ユーザー003"];

const TemporaryLogin = () => {
  const [sessionId, setSessionId] = useState('');
  const { user, createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = () => {
    createUser(sessionId);
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
                  onChange={(e) => setSessionId(e.target.value)}
                  checked={item === sessionId}
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
