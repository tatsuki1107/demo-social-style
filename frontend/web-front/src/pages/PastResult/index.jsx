import React, { useState } from "react";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";
// components
import Button from "../../components/Atoms/Button";
import Result from "../../components/Oganisms/Result";
// Hooks
import useResult from "../../Hooks/useResult";

const ButtonArea = styled.div`
  padding-top: 150px;
  padding-bottom: 100px;
  width: 100%;
  height: 500px;
  display:flex;
  flex-flow: column;
`;
const Block = styled.div`
  margin-bottom: 30px;
`

const PastResult = () => {
  const [resultDate, setResultDate] = useState("");
  const { result } = useResult("");

  const onClick = (date) => {
    setResultDate(date);
  }
  const setDisabled = (date) => {
    if (date === resultDate) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Template>
        <Main>
          <ButtonArea>
            {result.previous?.map((date, index) => {
              return (
                <Block key={index}>
                  <Button
                    type="pastDate"
                    onClick={() => onClick(date)}
                    disabled={setDisabled(date)}
                  >
                    {`${date} 診断結果`}
                  </Button>
                </Block>
              )
            })}
            <Block>
              <Button
                type="pastDate"
                onClick={() => onClick('')}
                disabled={setDisabled('')}
              >
                {`${result.date} 診断結果`}
              </Button>
            </Block>
          </ButtonArea>
          <Result date={resultDate} />
        </Main>
      </Template>
    </>
  );
};

export default PastResult;
