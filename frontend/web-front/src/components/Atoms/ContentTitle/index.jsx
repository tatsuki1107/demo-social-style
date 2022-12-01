import React from "react";
import Typography from "../Typography";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  height: 30px;
`;

const Border = styled.div`
width: 5px;
height: 50px;
background-color: #DF7919;
margin-right: 10px;
border-radius: 5px;
`;

const Title = styled.div`
margin: 6px 0px 0px 0px;
padding: 0;
height: 30px;
@media all and (max-width : 560px) {
  font-size: 0.9em;
}
@media all and (max-width: 470px) {
  font-size: 0.85em;
}
`
  ;

const ContentTitle = ({ children }) => {
  return (
    <>
      <Content>
        <Border />
        <Title>
          <Typography type="h3" color="orenge" size="s" margin={0}>
            {children}
          </Typography>
        </Title>
      </Content>
    </>
  );
};

export default ContentTitle;
