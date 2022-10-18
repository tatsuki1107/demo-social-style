import { useState, useCallback } from "react"

const useStyleCounter = () => {
  const [Xcount, setXCount] = useState(0);
  const [Ycount, setYCount] = useState(0);
  const calcuCount = useCallback((yesNoNum, pos) => {
    if (pos === "X") {
      setXCount(num => num + yesNoNum);
    } else if (pos === "Y") {
      setYCount(num => num + yesNoNum);
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
