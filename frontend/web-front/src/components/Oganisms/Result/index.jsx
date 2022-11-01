import React from "react";
import styled from "styled-components";
import './index.css'
// components
import Typography from "../../Atoms/Typography";
import ContentTitle from "../../Atoms/ContentTitle";
// img
import graph_img from '../../../img/StyleGraph_t.jpg';
import pointer from '../../../img/point.svg';
import exp from '../../../img/maru_exp.svg';
import dri from '../../../img/maru_dri.svg';
import ana from '../../../img/maru_Ana.svg';
import emi from '../../../img/maru_emi.svg';
// hooks
import useResult from "../../../Hooks/useResult";
// transform
import { toDateTransform } from "../../../js/transform";
// skeleton
import ContentLoader from "styled-content-loader";

const border = [emi, dri, ana, exp];
const allStyle = ["エミアブル", "ドライバー", "アナリティカル", "エクスプレッシブ"];

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
  height: 125px;
  padding: 3px 10px 12px 10px;
  display: inline-block;
  margin-top: 60px;
  border-radius: 30px;
  @media all and (max-width: 450px) {
    font-size: 0.8em;
    width: 220px;
    height: 100px;
  }
`;

const GraphImage = styled.div`
  position: relative;
  margin: 0 auto;
  width: 83%;
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
  min-height: 100px;
  margin-top: 30px;
  margin-left: 10px;
  text-align: left;
`;
const Type = styled.div`
  display: flex;
  margin: 10px 0px 10px 10px;
  @media all and (max-width: 475px) {
    font-size: 0.85em;
  }
`

const Discription = styled.div`
	margin-left: 45px;
  min-height: 200px;
`;

const Disc_logo = styled.img`
  margin: 1px 10px 0 0;
  width: 30px;
  height: 30px;
`;

const ResponsiveTxt = styled.div`
  min-height: 140px;
  @media all and (max-width: 580px) {
    font-size: 0.8em;
  }
  @media all and (max-width: 465px) {
    font-size: 0.7em;
  }
  @media all and (max-width: 410px) {
    font-size: 0.6em;
  }
`

// Dateを指定して結果を表示。診断後の結果表示はデータベースに格納されている一番最新をもらう
const Result = ({ date }) => {
  const { result, loading } = useResult(date);

  return (
    <>
      <ResultArea>
        <Underline />
        <ContentLoader isLoading={loading}>
          <DiaResult>
            <Typography type="h2" margin={0} style={"margin-top : -6px"}>
              {toDateTransform(result.Time)}<br />診断結果
            </Typography>
          </DiaResult>
          <ResponsiveTxt>
            <Typography type="h2">
              あなたは<br /><span>{result.SocialStyle}</span><br />の傾向が強いようです
            </Typography>
            <Typography type="h2" color="black">
              意見主張度: <span>{Math.round(result.X)}</span>% 感情表現度 : <span>{Math.round(result.Y)}</span>%
            </Typography>
          </ResponsiveTxt>
        </ContentLoader>

        <GraphImage>
          <ImgArea src={graph_img} alt="graph_img" />
          <Pointer src={pointer} style={{ top: `${result.Y}%`, left: `${result.X}%` }} alt="pointer" />
        </GraphImage>

        <Feature>
          <ContentTitle>診断結果が似ている方の特徴</ContentTitle>
          <ContentLoader isLoading={loading}>
            <Feature_content>
              {result.Feature?.map((output, index) => {
                return (
                  <Typography type="text" size="m" margin={0} key={index}>
                    {`・${output}`}
                  </Typography>
                )
              })}
            </Feature_content>
          </ContentLoader>
        </Feature>
        <Feature>
          <ContentTitle>このタイプに向いている仕事</ContentTitle>
          <ContentLoader isLoading={loading}>
            <Feature_content>
              {result.Profession?.map((output, index) => {
                return (
                  <Typography type="text" size="m" key={index} margin={0}>
                    {`・${output}`}
                  </Typography>
                )
              })}
            </Feature_content>
          </ContentLoader>
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
                <ContentLoader isLoading={loading}>
                  <Discription>
                    <Typography type="text" size="m" >
                      {description.split(/(\r\n|\r\n)/g).map(
                        (txt, i) => (txt === "\r\n") ? <br key={i} /> : txt)
                      }
                    </Typography>
                  </Discription>
                </ContentLoader>
              </Feature>
            )
          })}
        </Feature>
      </ResultArea>
    </>

  );
};

export default Result;
