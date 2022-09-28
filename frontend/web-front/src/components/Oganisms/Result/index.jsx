import React from "react";
import styled from "styled-components";

// components
import Typography from "../../Atoms/Typography";
import ContentTitle from "../../Atoms/ContentTitle";
// img
import graph_img from '../../../img/result.png';
// hooks
import useResult from "../../../Hooks/useResult";


const ResultArea = styled.div`
  width: 100%;
  text-align: center;
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
  width: 100%;
  
`;

const ImgArea = styled.img`
  width: 85%;
  height: 85%;
  @media (max-width: 660px) {
    width: 100%;
    height: 100%;
  }
`;

const Feature = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;
const Type = styled.div`
  display: flex;
`
const Maru = styled.div`
  margin: 3px 3px 0 0;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: #DF7919;
`;

// Dateを指定して結果を表示。診断後の結果表示はデータベースに格納されている一番最新をもらう
const Result = ({ date }) => {
  const { result, style } = useResult(date);

  return (
    <ResultArea>
      <Underline />
      <DiaResult>
        <Typography type="h2" margin={0}>
          {result.date}<br />診断結果
        </Typography>
      </DiaResult>
      <Typography type="text" size="l">
        あなたは<br /><span>{style}</span>の傾向が強いようです
      </Typography>
      <Typography type="text" size="l" color="orenge">
        {`意見主張度 ${result.X}% : 感情表現度 : ${result.Y}%`}
      </Typography>
      <GraphImage>
        <ImgArea src={graph_img} alt="socialStyle_graph" />
      </GraphImage>
      <Feature>
        <ContentTitle>診断結果が似ている方の特徴</ContentTitle>
        <Feature>
          {result.feature?.map((output, index) => {
            return (
              <Typography type="text" size="m" margin={0} key={index}>
                {`・${output}`}
              </Typography>
            )
          })}
        </Feature>
      </Feature>
      <Feature>
        <ContentTitle>診断結果が似ている方に多い就いている仕事</ContentTitle>
        <Feature>
          {result.Profession?.map((output, index) => {
            return (
              <Typography type="text" size="m" key={index} margin={0}>
                {`・${output}`}
              </Typography>
            )
          })}
        </Feature>
      </Feature>
      <Feature>
        <ContentTitle>タイプ別の上手な関わり方</ContentTitle>
        <Feature>
          <Type>
            <Maru />
            <Typography type="h3" size="s" color="orenge" margin={0}>
              Amiable(エミアブル)タイプ
            </Typography>
          </Type>
          <Typography type="text" size="m">
            {result.Relational_description?.[0]}
          </Typography>
        </Feature>
        <Feature>
          <Type>
            <Maru />
            <Typography type="h3" size="s" color="orenge" margin={0}>
              Driver(ドライバー)タイプ
            </Typography>
          </Type>
          <Typography type="text" size="m">
            {result?.Relational_description?.[1]}
          </Typography>
        </Feature>
        <Feature>
          <Type>
            <Maru />
            <Typography type="h3" size="s" color="orenge" margin={0}>
              Analytical(アナリティカル)タイプ
            </Typography>
          </Type>
          <Typography type="text" size="m">
            {result?.Relational_description?.[2]}
          </Typography>
        </Feature>
        <Feature>
          <Type>
            <Maru />
            <Typography type="h3" size="s" color="orenge" margin={0}>
              Expressibe(エクスプレッシブ)タイプ
            </Typography>
          </Type>
          <Typography type="text" size="m">
            {result?.Relational_description?.[3]}
          </Typography>
        </Feature>
      </Feature>
    </ResultArea>
  );
};

export default Result;
