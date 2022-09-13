import React from "react";
import styled, { css } from "styled-components";

const sizeMap = {
  xs: css`
    font-size: 12px`,
  s: css`
    font-size: 14px`,
  m: css`
    font-siza: 16px`,
}

const colorsMap = {
  black: '#000000',
  orenge: '#DF7919',
  white: '#F6F2E8'
}
export const sizes = Object.keys(sizeMap);
export const colors = Object.keys(colorsMap);
export const display = ['initial', 'block']

const Text = styled.p`
  color: ${({ color }) => colorsMap[color]};
  ${({ size }) => sizeMap[size]};
  display: ${({ display }) => display};
`;

const Title = styled.div`
  display: flex;
`;
const radius = styled.div`
  background: #DF7919;
  border-radius: 50px;
`;
const textTitle = styled.h2`
  font-size: 43px;
  color: #DF7919;
  margin: 0 0 0 30px;
`;

const Typography = ({ size, color, display, children, type }) => {
  return (
    <>
      {type === "text" ?
        <Text
          size={size}
          color={color}
          display={display}
        >
          {children}
        </Text>
        :
        <Title>{children}</Title>}
    </>
  );
};

export default Typography;
