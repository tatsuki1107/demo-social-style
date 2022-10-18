import React from "react";
import styled from "styled-components";
import './index.css'
// components
import Typography from "../../Atoms/Typography";
import ContentTitle from "../../Atoms/ContentTitle";
// img
import graph_img from '../../../img/StyleGraph_t.jpg';
import pointer from '../../../img/point.svg';
import hosi from '../../../img/hosi.svg';
import sikaku from '../../../img/sikaku.svg';
import sankaku from '../../../img/sankaku.svg';
import maru from '../../../img/maru.svg';
// hooks
import useResult from "../../../Hooks/useResult";
// transform
import { toDateTransform } from "../../../js/transform";

const border = [maru, sikaku, sankaku, hosi];
const allStyle = ["Amiable(エミアブル)", "Driver(ドライバー)", "Analytical(アナリティカル)", "Expressibe(エクスプレッシブ)"];

const ResultArea = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
`;

const Underline = styled.div`
  width: 100%;
  border: 4px dashed #DF7919;
`;

const DiaResult = styled.div`
  background-color: #FFFFFF;
  width: 240px;
  padding: 10px;
  display: inline-block;
  margin-top: 80px;
`;

const GraphImage = styled.div`
  position: relative;
  margin: 0 auto;
  width: 85%;
  @media (max-width: 660px) {
    width: 100%;
    height: 100%;
  }
`;

const ImgArea = styled.img`
  width: 100%;
  height: 100%;
`;

const Pointer = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15%;
  height: 15%;
  animation: flash 0.7s ease-out infinite;
  transform: translate(-49.5%, -50%);
  transition: top 2s 1s, left 2s 1s;

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Feature = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;
const Feature_content = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 10px;
  text-align: left;
`;
const Type = styled.div`
  display: flex;
  margin: 10px 0px 10px 10px;
  @media all and (max-width: 500px) {
    font-size: 0.8em;
  }
`

const Discription = styled.div`
	margin-left: 45px;
`;

const Disc_logo = styled.img`
  margin: 3px 10px 0 0;
  width: 30px;
  height: 30px;
`;

// Dateを指定して結果を表示。診断後の結果表示はデータベースに格納されている一番最新をもらう
const Result = ({ date }) => {
<<<<<<< HEAD
  const { result, style } = useResult(date);
  return (
    <ResultArea >
      <Underline />
      <DiaResult >
        <Typography type="h2" margin={0}>
          {result.date}<br />診断結果
=======
  const { result } = useResult(date);

  return (
    <>
      <ResultArea>
        <Underline />
        <DiaResult>
          <Typography type="h2" margin={0}>
            {toDateTransform(result.Time)}<br />診断結果
          </Typography>
        </DiaResult>
        <Typography type="text" size="l">
          あなたは<br /><span>{result.SocialStyle}</span>の傾向が強いようです
        </Typography>
        <Typography type="text" size="l" color="orenge">
          {`意見主張度 ${Math.round(result.X)}% : 感情表現度 : ${Math.round(result.Y)}%`}
>>>>>>> 045e4a2dbc4a1ba1c79a44cee4814596e3dd7499
        </Typography>

        <GraphImage>
          <ImgArea src={graph_img} alt="graph_img" />
          <Pointer src={pointer} style={{ top: `${result.X}%`, left: `${result.Y}%` }} alt="pointer" />
        </GraphImage>

        <Feature>
          <ContentTitle>診断結果が似ている方の特徴</ContentTitle>
          <Feature_content>
            {result.Feature?.map((output, index) => {
              return (
                <Typography type="text" size="m" margin={0} key={index}>
                  {`・${output}`}
                </Typography>
              )
            })}
          </Feature_content>
        </Feature>
        <Feature>
          <ContentTitle>診断結果が似ている方に多い就いている仕事</ContentTitle>
          <Feature_content>
            {result.Profession?.map((output, index) => {
              return (
                <Typography type="text" size="m" key={index} margin={0}>
                  {`・${output}`}
                </Typography>
              )
            })}
          </Feature_content>
        </Feature>
        <Feature>
          <ContentTitle>タイプ別の上手な関わり方</ContentTitle>
          {result.Relational_Description?.map((description, index) => {
            return (
              <Feature key={index}>
                <Type>
                  <Disc_logo src={border[index]} />
                  <Typography type="h3" size="s" color="orenge" margin={0}>
                    {`${allStyle[index]}タイプ`}
                  </Typography>
                </Type>
                <Discription>
                  <Typography type="text" size="m" >
                    {description}
                  </Typography>
                </Discription>
              </Feature>
            )
          })}
        </Feature>
      </ResultArea>
    </>

  );
};

export default Result;
