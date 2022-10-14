import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Routings/AuthService";
// 仮データ
// transform
import { toUnixTransform } from "../data/transform";

const useResult = (date) => {
  const [result, setResult] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // APIでGET /get_result/{date}
    // { "date": "string", "X": float, "Y": float, "feature": [string], "Profession": [string], "Relational_description":[[string]]}
    (async () => {
      try {
        const data = { ...user }
        if (date !== "") {
          data["time"] = toUnixTransform(date);
        }
        await axios.post('http://localhost/api/get_result', data).then((res) => setResult((res?.data)))
      } catch (e) {
        alert(`エラーが発生しました。エラーコード: ${e.response.status}`)
        navigate('/')
      }
    })()
  }, [date]);

  return { result };
};

export default useResult;
