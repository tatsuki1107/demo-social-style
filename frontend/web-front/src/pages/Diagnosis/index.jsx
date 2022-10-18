import './index.css';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";
import axios from "axios";
// components
import Loading from '../../components/Atoms/Loading';
import Question from "../../components/Oganisms/Question";
import Result from "../../components/Oganisms/Result";
import Typography from "../../components/Atoms/Typography";
import Button from "../../components/Atoms/Button";
// Hooks
import useStyleCounter from "../../Hooks/useStyleCounter";
import { useAuth } from '../../Routings/AuthService';
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
  const { user, handleError } = useAuth();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true)
  const { calcuCount, xyCaluculation } = useStyleCounter()

  const navigate = useNavigate();
  const goTopPage = () => {
    navigate('/');
  };
  const totalCountUp = useCallback(() => {
    setTotalCount(num => num + 1)
  }, [totalCount]);

  const onResult = async () => {
    if (totalCount === data.length) {
      const coordinate = xyCaluculation(totalCount);
      try {
        const data = { ...user, ...coordinate };
        await axios.post('http://localhost/api/send_param', data)
          .then(() => { setFlag(true) });
      } catch (e) {
        handleError(e.response.status);
      }
    } else {
      alert('未回答の問題があります')
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await axios.post('http://localhost/api/questions', user).then((res) => { setData(res?.data) })
        setLoading(false);
      } catch (e) {
        handleError(e.response.status);
      }
    })()
  }, [])

  return (
    <>
      <Template>
        <Main>
          {loading ? <Loading /> :
            <>
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
                    <Typography type="text" size="m" color="orenge">{data.length}問</Typography>
                  </Icon_flex>
                  <Icon_flex>
                    <img src={timer_icon} className="question_icon" alt="timer_icon" />
                    <Typography type="text" size="m" color="orenge">3:00</Typography>
                  </Icon_flex>
                </QandT>
              </Question>

              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Question
                      index={index + 1}
                      item={item}
                      totalCountUp={totalCountUp}
                      calcuCount={calcuCount}
                    />
                  </div>
                )
              })}
              <Underline />
              <Buttonzorn>
                <Button type="start" onClick={onResult} disabled={flag}>
                  診断する
                </Button>
                <Button type="maru" size="m" onClick={goTopPage}>Social Style診断とは</Button>
              </Buttonzorn>
              {flag && <Result date="" />}
            </>}
        </Main>
      </Template>
    </>
  );
};

export default Diagnosis;
