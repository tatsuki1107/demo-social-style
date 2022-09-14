import React from "react";
import styled from "styled-components";

// tmp_header
const Head = styled.header`
  width: 100%;
  height: 70px;
  background-color: #DF7919;
  position: fixed;
  z-index: 1;
`;

const Header = () => {
  return (
    <>
      <Head></Head>
    </>
  );
};

export default Header;
