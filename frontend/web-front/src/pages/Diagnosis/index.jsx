import './index.css';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";

// components
import Question from "../../components/Oganisms/Question";
import Result from "../../components/Oganisms/Result";
import Typography from "../../components/Atoms/Typography";
import Button from "../../components/Atoms/Button";

// APIで問題をもらってきた前提
import { questions } from "../../data";

// img import
import check_icon from "../../img/check.jpg";
import timer_icon from "../../img/timer.jpg";

const Icon_flex = styled.div`
  width: 100px;
  margin: 0px 40px;
  display: flex;
  justify-content: space-between;
`;
const QandT = styled.div`
  display: flex;
  justify-content: center;
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
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const goTopPage = () => {
    navigate('/');
  };
  const countUp = useCallback(() => {
    setCount(num => num + 1)
  }, [count]);
  const onResult = () => {
    // ここで結果をバックエンドにPOST
    if (count === 22) {
      setFlag(true);
    } else {
      alert('未回答の問題があります')
    }
  };
  useEffect(() => {
    (async () => {
      try {
        // APIでGET予定
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
            <Typography type="Q_h1" color="black">
              診断スタート
            </Typography>
            <Typography type="text" size="m" >
              自分が周りにどう思われているのか<br />直感的に選択してください
            </Typography>
            <QandT>
              <Icon_flex>
                <img src={check_icon} className="question_icon" alt="question_icon" />
                <Typography type="text" size="m" color="orenge">20問</Typography>
              </Icon_flex>
              <Icon_flex>
                <img src={timer_icon} className="question_icon" alt="timer_icon" />
                <Typography type="text" size="m" color="orenge">3:00</Typography>
              </Icon_flex>
            </QandT>
          </Question>

          {data.map((q) => {
            return (
              <Question
                key={q.id}
                id={q.id}
                question={q.question}
                countUp={countUp}
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
