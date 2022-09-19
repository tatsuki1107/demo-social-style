import { useState, useCallback } from "react"

const useStyleCounter = () => {
  const [aCount, setACount] = useState(0);
  const [bCount, setBCount] = useState(0);
  const [cCount, setCCount] = useState(0);
  const [dCount, setDCount] = useState(0);

  // ４つのカウント
  const calcuCount = useCallback((id, yesNo, upDown) => {
    if (upDown === "up") {
      if (id > 0 && id < 10) {
        if (yesNo === "yes") {
          setACount(num => num + 1);
        } else {
          setBCount(num => num + 1);
        }
      } else {
        if (yesNo === "yes") {
          setCCount(num => num + 1);
        } else {
          setDCount(num => num + 1)
        }
      }
    } else {
      if (id > 0 && id < 10) {
        if (yesNo === "yes") {
          setACount(num => num - 1);
        } else {
          setBCount(num => num - 1);
        }
      } else {
        if (yesNo === "yes") {
          setCCount(num => num - 1);
        } else {
          setDCount(num => num - 1);
        }
      }
    }
  }, [aCount, bCount, cCount, dCount]);

  return { aCount, bCount, cCount, dCount, calcuCount };
};

export default useStyleCounter;
