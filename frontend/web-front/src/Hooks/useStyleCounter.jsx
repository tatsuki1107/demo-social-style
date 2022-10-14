import { useState, useCallback } from "react"

const useStyleCounter = () => {
  const [Xcount, setXCount] = useState(0);
  const [Ycount, setYCount] = useState(0);
  const calcuCount = useCallback((yesNo, pos) => {
    if (yesNo === "yes") {
      if (pos === "X") {
        setXCount(num => num + 1);
      } else if (pos === "Y") {
        setYCount(num => num + 1);
      }
    } else if (yesNo === "no") {
      if (pos === "X") {
        setXCount(num => num - 1);
      } else if (pos === "Y") {
        setYCount(num => num - 1);
      }
    }
  }, [Xcount, Ycount]);

  const xyCaluculation = (totalCount) => {
    // %表記 
    const X = (((totalCount / 2) + Xcount) / totalCount) * 100;
    const Y = (((totalCount / 2) + Ycount) / totalCount) * 100;

    return { "X": X, "Y": Y };
  }

  return { calcuCount, xyCaluculation };
};

export default useStyleCounter;
