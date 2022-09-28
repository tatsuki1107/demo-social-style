import React, { useState, useEffect } from "react";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";
// 仮データ
import { style_result } from "../../data";
// components
import Button from "../../components/Atoms/Button";
import Result from "../../components/Oganisms/Result";

const ButtonArea = styled.div`
  padding-top: 150px;
  padding-bottom: 100px;
  width: 100%;
  height: 300px;
  display:flex;
  flex-flow: column;
`;
const Block = styled.div`
  margin-bottom: 30px;
`

const PastResult = () => {
  const [dates, setDates] = useState([]);
  const [openFlg, setOpenFlg] = useState(false);
  const [resultDate, setResultDate] = useState('');

  const onClick = (date) => {
    setResultDate(date);
    setOpenFlg(true);
  }
  useEffect(() => {
    (async () => {
      try {
        // APIでGET予定 /get_result
        setDates(style_result.previous)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])
  return (
    <>
      <Template>
        <Main>
          <ButtonArea>
            {dates.map((date, index) => {
              return (
                <Block key={index}>
                  <Button
                    type="pastDate"
                    onClick={() => onClick(date)}
                  >
                    {`${date} 診断結果`}
                  </Button>
                </Block>
              )
            })}
          </ButtonArea>
          {openFlg && <Result date={resultDate} />}
        </Main>
      </Template>
    </>
  );
};

export default PastResult;
