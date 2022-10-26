import { useState, useCallback } from "react"

const useStyleCounter = () => {
  const [allBoolean, setBoolean] = useState({});
  const [state, setState] = useState({ "X": 0, "Y": 0 });
  const calcuCount = useCallback((point, pos) => {
    setState(prev => ({ ...prev, [pos]: prev[pos] + point }))
  }, [state]);
  console.log(allBoolean);

  const changeBool = useCallback((index, length) => {
    if (length) {
      Initialization(length);
    } else {
      setBoolean(prev => ({ ...prev, [index]: true }))
    }
  }, [allBoolean])

  const xyCaluculation = (totalCount) => {
    // %表記 
    const X = ((totalCount + state.X) / (2 * totalCount)) * 100;
    const Y = ((totalCount + state.Y) / (2 * totalCount)) * 100;

    return { "X": X, "Y": Y };
  }

  const Initialization = (length) => {
    const boolObj = new Object();
    for (let i = 0; i < length; i++) {
      boolObj[i] = false;
    }
    setBoolean(boolObj);
  }

  return { calcuCount, xyCaluculation, changeBool };
};

export default useStyleCounter;
