import React from "react";
import ReactLoading from "react-loading";
import './index.css';

const Loading = () => {
  return (
    <>
      <ReactLoading
        type="spin"
        color="#000000"
        height="100px"
        width="100px"
        className="loading"
      >
      </ReactLoading>
    </>
  );
};

export default Loading;
