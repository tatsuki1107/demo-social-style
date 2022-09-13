import React from "react";
import styled, { css } from "styled-components";

const textSizeMap = {
  s: css`
    font-size: 1.25em`,
  m: css`
    font-size: 1.35em`,
  l: css`
    font-size: 1.7em`,
}

const h3sizeMap = {
  s: css`
    font-size: 1.5em`,
  m: css`
    font-size: 2.0em`,
}

const colorsMap = {
  black: '#000000',
  orenge: '#DF7919',
  white: '#fff',
}

const Text = styled.p`
  color: ${({ color }) => colorsMap[color]};
  ${({ size }) => textSizeMap[size]};
  width: 100%;
  span {
    color: #DF7919;
  }
`;

const TitleH1 = styled.h1`
  font-size: 4.0em;
  color: ${({ color }) => colorsMap[color]};
`
const TitleH2 = styled.h2`
  font-size: 2em;
  font-weight: 600;
  span {
    color: #DF7919;
    font-size: 1.3em;
  }
`
const TitleH3 = styled.h3`
  ${({ size }) => h3sizeMap[size]};
  color: ${({ color }) => colorsMap[color]};
  margin: ${({ margin }) => margin};
`

const Typography = ({ size, color, children, type, margin }) => {
  return (
    <>
      {type === "text" &&
        <Text
          size={size}
          color={color}
        >
          {children}
        </Text>
      }
      {type === "h1" &&
        <TitleH1 color={color}>{children}</TitleH1>
      }
      {type === "h2" &&
        <TitleH2>{children}</TitleH2>
      }
      {type === "h3" &&
        <TitleH3
          size={size}
          color={color}
          margin={margin}
        >{children}</TitleH3>
      }
    </>
  );
};

export default Typography;
