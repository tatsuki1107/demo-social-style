import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Routings/AuthService";
// transform
import { toUnixTransform } from "../js/transform";

const defaultState = {
  Time: '', X: null, Y: null,
  Feature: [],
  Profession: [],
  Relational_Description: [],
  SocialStyle: ''
};

const useResult = (date) => {
  const [result, setResult] = useState(defaultState);
  const { user, handleError } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = { ...user }
        if (date !== "") {
          data["time"] = toUnixTransform(date);
        }
        await axios.post('http://localhost/api/get_result', data).then((res) => setResult((res?.data)))
      } catch (e) {
        handleError(e.response.status)
      }
    })()
  }, [date]);

  return { result };
};

export default useResult;
