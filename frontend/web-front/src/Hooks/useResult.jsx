import { useState, useEffect } from "react";
// 仮データ
import { style_result, style_result_2 } from "../data";

const useResult = (date) => {
  const [result, setResult] = useState({});
  const [style, setStyle] = useState('');

  useEffect(() => {
    // APIでGET /get_result/{date}
    // { "date": "string", "X": float, "Y": float, "feature": [string], "Profession": [string], "Relational_description":[[string]]}
    (async () => {
      try {
        if (date !== "") {
          setResult(style_result_2);
        } else {
          setResult(style_result);
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [date]);

  useEffect(() => {
    if (result.X > 50) {
      if (result.Y > 50) {
        setStyle('エクスプレッシブ');
      } else {
        setStyle('ドライバー');
      }
    } else {
      if (result.Y > 50) {
        setStyle('エミアブル');
      } else {
        setStyle('アナリティカル');
      }
    }
  }, [result])

  return { result, style };
};

export default useResult;
