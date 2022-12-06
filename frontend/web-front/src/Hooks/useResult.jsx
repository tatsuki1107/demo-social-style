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
  SocialStyle: '',
  Previous: [],
};

const useResult = (date) => {
  const [result, setResult] = useState(defaultState);
  const [loading, setLoading] = useState(true)
  const { user, handleError } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = { ...user };
        if (date !== "") {
          data["time"] = toUnixTransform(date);
        }
        await axios.post('http://localhost/api/get_result', data).then((res) => {
          setResult((res?.data));
          setLoading(false);
        })
      } catch (e) {
        handleError(e.response.status)
      }
    })()
  }, [date]);

  return { result, loading };
};

export default useResult;
