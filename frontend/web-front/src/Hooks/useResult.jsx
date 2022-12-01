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
        const data = { ...user }
        if (date !== "") {
          data["time"] = toUnixTransform(date);
        }
        await axios.post('http://ec2-52-192-243-165.ap-northeast-1.compute.amazonaws.com/api/get_result', data).then((res) => {
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
