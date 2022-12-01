import React from "react";
import Footer from "../Oganisms/Footer";
import Header from "../Oganisms/Header";
import styled from "styled-components";

const App = styled.div`
  background-color: #F6F2E8;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.div`
  width: 800px;
  margin: 0 auto;
  padding-top: 150px;
  @media(max-width: 860px) {
    width: 90%;
  }
`;

const Template = ({ children }) => {
  return (
    <>
      <App>
        <Header />
        {children}
        <Footer />
      </App>
    </>

  );
};

export default Template;
