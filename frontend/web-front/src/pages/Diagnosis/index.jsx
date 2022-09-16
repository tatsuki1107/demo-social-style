import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";

// components
import Question from "../../components/Oganisms/Question";
import Typography from "../../components/Atoms/Typography";
import Button from "../../components/Atoms/Button";

// APIで問題をもらってきた前提
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
  const navigate = useNavigate();
  const goTopPage = () => {
    navigate('/');
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
            <Typography type="h1" color="black">
              診断スタート
            </Typography>
            <Typography type="text" size="m">
              自分が周りにどう思われているのか<br />直感的に選択してください
            </Typography>
            <QandT>
              <Typography type="text" size="s" color="orenge">
                20問
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
              />
            )
          })}

          <Underline />
          <Buttonzorn>
            <Button type="start">
              診断する
            </Button>
            <Button type="maru" onClick={goTopPage}>Social Style診断とは</Button>
          </Buttonzorn>
        </Main>
      </Template>
    </>
  );
};

export default Diagnosis;
