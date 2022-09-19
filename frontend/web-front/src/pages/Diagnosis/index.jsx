import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";

// components
import Question from "../../components/Oganisms/Question";
import Result from "../../components/Oganisms/Result";
import Typography from "../../components/Atoms/Typography";
import Button from "../../components/Atoms/Button";

// Hooks
import useStyleCounter from "../../Hooks/useStyleCounter";

// APIで問題をもらってきた前提のdata
import { questions } from "../../data";

const QandT = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Underline = styled.div`
  width: 100%;
  border: 4px dashed #DF7919;
`;
const Buttonzorn = styled.div`
  width: 100%;
  height: 150px;
  margin: 70px 0 70px 0;
  display:flex;
  flex-flow: column;
  justify-content:space-between;
`;

const Diagnosis = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const { aCount, bCount, cCount, dCount, calcuCount } = useStyleCounter()

  const navigate = useNavigate();
  const goTopPage = () => {
    navigate('/');
  };
  const totalCountUp = useCallback(() => {
    setTotalCount(num => num + 1)
  }, [totalCount]);

  const onResult = async () => {
    if (totalCount === 18) {
      // %表記 (小数点第一で四捨五入)
      const X = Math.round(((totalCount / 2 + (aCount - bCount)) / totalCount) * 100);
      const Y = Math.round(((totalCount / 2 + (cCount - dCount)) / totalCount) * 100);
      let style;
      console.log(`x軸: ${X}, y軸: ${Y}`);
      if (X > 50) {
        if (Y > 50) {
          style = 'エクスプレッシブ';
        } else {
          style = 'ドライビング';
        }
      } else {
        if (Y > 50) {
          style = 'エミアブル';
        } else {
          style = 'アナリティカル';
        }
      }

      try {
        // ここでPOSTするかな 各結果は状態管理しなくてもよさそうだから
        console.log({ userId: "001", タイプ: style, X: X, y: Y, created: new Date() })
      } catch (e) {
        console.error(e);
      } finally {
        setFlag(true);
      }
    } else {
      alert('未回答の問題があります')
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // APIでGET予定
        //[{Id, question}]でもらいたい
        setData(questions);
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <>
      <Template>
        <Main>
          <Question type="top">
            <Typography type="h1" color="black">
              診断スタート
            </Typography>
            <Typography type="text" size="m">
              自分が周りにどう思われているのか<br />直感的に選択してください
            </Typography>
            <QandT>
              <Typography type="text" size="s" color="orenge">
                18問
              </Typography>
              <Typography type="text" size="s" color="orenge">
                3:00
              </Typography>
            </QandT>
          </Question>

          {data.map((q) => {
            return (
              <Question
                key={q.id}
                id={q.id}
                question={q.question}
                totalCountUp={totalCountUp}
                calcuCount={calcuCount}
              />
            )
          })}

          <Underline />
          <Buttonzorn>
            <Button type="start" onClick={onResult}>
              診断する
            </Button>
            <Button type="maru" onClick={goTopPage}>Social Style診断とは</Button>
          </Buttonzorn>
          {flag && <Result />}
        </Main>
      </Template>
    </>
  );
};

export default Diagnosis;
