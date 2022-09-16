import React from "react";
import styled from "styled-components";

// components
import Typography from "../../Atoms/Typography";
import ContentTitle from "../../Atoms/ContentTitle";
// img
import graph_img from '../../../img/result.png';

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
`

const Result = () => {
  return (
    <ResultArea>
      <Underline />
      <DiaResult>
        <Typography type="h2" margin={0}>
          診断結果
        </Typography>
      </DiaResult>
      <Typography type="text" size="l">
        あなたは<br /><span>XXXX</span>の傾向が強いようです
      </Typography>
      <Typography type="text" size="l" color="orenge">
        意見主張度 XX% : 感情表現度 : YY%
      </Typography>
      <GraphImage>
        <ImgArea src={graph_img} alt="socialStyle_graph" />
      </GraphImage>
      <Feature>
        <ContentTitle>診断結果が似ている方の特徴</ContentTitle>
        <Typography type="text" size="m">
          ・ここに当てはまる特徴を記載します<br />
          ・ここに当てはまる特徴を記載します<br />
          ・ここに当てはまる特徴を記載します
        </Typography>
      </Feature>
      <Feature>
        <ContentTitle>診断結果が似ている方に多い就いている仕事</ContentTitle>
        <Typography type="text" size="m">
          ・ここに向いている職種を記載します<br />
          ・ここに向いている職種を記載します<br />
          ・ここに向いている職種を記載します
        </Typography>
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
