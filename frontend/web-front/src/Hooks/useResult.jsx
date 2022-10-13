import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Routings/AuthService";
// 仮データ
import { style_result, style_result_2 } from "../data";

const useResult = (date) => {
  const [result, setResult] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    // APIでGET /get_result/{date}
    // { "date": "string", "X": float, "Y": float, "feature": [string], "Profession": [string], "Relational_description":[[string]]}
    (async () => {
      try {
        if (date === "") {
          await axios.post('http://localhost/api/get_result', user).then((res) => setResult(res?.data))
        } else {
          setResult(style_result);
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [date]);

  return { result };
};

export default useResult;
