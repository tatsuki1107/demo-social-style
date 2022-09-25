import React, { useState, useEffect } from "react";
import styled from "styled-components";
import './index.css'
// components
import Typography from "../../Atoms/Typography";
import ContentTitle from "../../Atoms/ContentTitle";
// img
import graph_img from '../../../img/StyleGraph_w.jpg';
import pointer from '../../../img/point.svg';
// APIでもらってきた前提のdata
import { style_result } from "../../../data";


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
  animation: flash 2s ease-out infinite;
  transform: translate(-48%, -50%);
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
const Result = () => {
  // result, タイプに紐付いた仕事と特徴をAPIでもらう
  const [result, setResult] = useState({});
  useEffect(() => {
    (async () => {
      try {
        setResult(style_result)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <ResultArea>
      <Underline />
      <DiaResult>
        <Typography type="h2" margin={0}>
          診断結果
        </Typography>
      </DiaResult>
      <Typography type="text" size="l">
        あなたは<br /><span>{result.style}</span>の傾向が強いようです
      </Typography>
      <Typography type="text" size="l" color="orenge">
        {`意見主張度 ${result.x}% : 感情表現度 : ${result.y}%`}
      </Typography>

      <GraphImage>
        <ImgArea src={graph_img} alt="graph_img" />
        <Pointer src={pointer} style={{top: `${result.y}%`, left:`${result.x}%`}} alt="pointer" />
      </GraphImage>
      
      <Feature>
        <ContentTitle>診断結果が似ている方の特徴</ContentTitle>
        <Feature>
          {result.feature?.map((f) => {
            return (
              <Typography type="text" size="m" margin={0} key={f.id}>
                {`・${f.character}`}
              </Typography>
            )
          })}
        </Feature>
      </Feature>
      <Feature>
        <ContentTitle>診断結果が似ている方に多い就いている仕事</ContentTitle>
        <Feature>
          {result.work?.map((w) => {
            return (
              <Typography type="text" size="m" key={w.id} margin={0}>
                {`・${w.job}`}
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
            エミアブルタイプは○○○○で△△△な性格を持ち合わせた方が多いです。といった形で対象のタイプの簡単な説明を入れます。<br />
            XXXXXタイプとのかかわり方として、とてもOOOOでYYYYだとおもいますが、△△△の場面において考え方に違いが生まれる可能性が高いので注意が必要です。といったようなをこ、
            関わることによるメリットと関わる際の注意点をここに記述します。(いいところ・注意すべき点といったように分けてもいいかも)
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
            ドライバータイプは○○○○で△△△な性格を持ち合わせた方が多いです。といった形で対象のタイプの簡単な説明を入れます。<br />
            XXXXXタイプとのかかわり方として、とてもOOOOでYYYYだとおもいますが、△△△の場面において考え方に違いが生まれる可能性が高いので注意が必要です。といったような,、かかわることによるメリットと、かかわる際の注意点をここに記述します。(いいところ・注意すべき点といったように分けてもいいかも)
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
            アナリティカルタイプは○○○○で△△△な性格を持ち合わせた方が多いです。といった形で対象のタイプの簡単な説明を入れます。<br />
            XXXXXタイプとのかかわり方として、とてもOOOOでYYYYだとおもいますが、△△△の場面において考え方に違いが生まれる可能性が高いので注意が必要です。といったような,、かかわることによるメリットと、かかわる際の注意点をここに記述します。(いいところ・注意すべき点といったように分けてもいいかも)
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
            エクスプレッシブタイプは○○○○で△△△な性格を持ち合わせた方が多いです。といった形で対象のタイプの簡単な説明を入れます。<br />
            XXXXXタイプとのかかわり方として、とてもOOOOでYYYYだとおもいますが、△△△の場面において考え方に違いが生まれる可能性が高いので注意が必要です。といったような,、かかわることによるメリットと、かかわる際の注意点をここに記述します。(いいところ・注意すべき点といったように分けてもいいかも)
          </Typography>
        </Feature>
      </Feature>
    </ResultArea>
  );
};

export default Result;
