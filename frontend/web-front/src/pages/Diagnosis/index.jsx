import './index.css';
import React, { useState, useEffect, useCallback, useRef, useLayoutEffect, createRef } from "react";
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
  const [totalCount, setTotalCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const { aCount, bCount, cCount, dCount, calcuCount } = useStyleCounter();
  const scrollBottomRef = useRef(null);
  const questionRefContent = useRef([]);
  const windowHeight = window.innerHeight;
  const navigate = useNavigate();
  const goTopPage = () => {
    navigate('/');
  };

  function getRect(elm) {
    return elm.current.getBoundingClientRect();
  }

  const totalCountUp = useCallback((index) => {
    debugger;
    const contentRect = getRect(questionRefContent.current[index - 1]);
    if (windowHeight - contentRect.top < 500 && index < 18) {
      const offset = window.pageYOffset;
      const scrollCountentRect = getRect(questionRefContent.current[index]);
      const gap = windowHeight < 700 ? 50 : 80;
      const target = offset + scrollCountentRect.top - gap;
      window.scrollTo({
        top: target,
        // 不具合発生中の為、一時コメントアウト
        // behavior: 'smooth' 
      });
    }
    setTotalCount(num => num + 1)
  }, [totalCount]);

  const onResult = async () => {
    if (totalCount === data.length) {
      // %表記 (小数点第一で四捨五入)
      const X = Math.round(((totalCount / 2 + (aCount - bCount)) / totalCount) * 100);
      const Y = Math.round(((totalCount / 2 + (cCount - dCount)) / totalCount) * 100);
      let style;

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
        // API: POST, { "X": float, "Y": float }
        console.log({ X: X, Y: Y, style: style })
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
        // { "question": string, "select-type": int, "pos": string }
        setData(questions);
      } catch (e) {
        console.error(e)
      }
    })()
  }, []);

  useLayoutEffect(() => {
    if(scrollBottomRef && scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView();
    }
  }, [flag]);

  data.forEach((_, index)=>{
    questionRefContent.current[index] = createRef(null);
  });

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
                <Typography type="text" size="m" color="orenge">{data.length}問</Typography>
              </Icon_flex>
              <Icon_flex>
                <img src={timer_icon} className="question_icon" alt="timer_icon" />
                <Typography type="text" size="m" color="orenge">3:00</Typography>
              </Icon_flex>
            </QandT>
          </Question>

          {data.map((q, index) => {
            return (
              <div ref={questionRefContent.current[index]}>
                <Question
                  key={index}
                  index={index + 1}
                  pos={q.pos}
                  question={q.question}
                  totalCountUp={totalCountUp}
                  calcuCount={calcuCount}
                />
              </div>
            )
          })}

          <Underline />
          <Buttonzorn>
            <Button type="start" onClick={onResult}>
              診断する
            </Button>
            <Button type="maru" size="m" onClick={goTopPage}>Social Style診断とは</Button>
          </Buttonzorn>
          {flag && <div ref={scrollBottomRef}><Result date="" /></div> }
        </Main>
      </Template>
    </>
  );
};

export default Diagnosis;
