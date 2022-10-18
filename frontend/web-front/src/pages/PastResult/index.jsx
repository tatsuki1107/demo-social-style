import React, { useState } from "react";
import Template, { Main } from "../../components/Templates";
import styled from "styled-components";
// components
import Loading from "../../components/Atoms/Loading";
import Button from "../../components/Atoms/Button";
import Result from "../../components/Oganisms/Result";
// Hooks
import useResult from "../../Hooks/useResult";
// transform
import { toDateTransform } from "../../js/transform";

const ButtonArea = styled.div`
  padding: 150px 0 50px 0;
  width: 100%;
  min-height: 100px;
  display:flex;
  flex-flow: column;
`;
const Block = styled.div`
  margin-bottom: 30px;
`

const PastResult = () => {
  const { result } = useResult("");
  const [resultDate, setResultDate] = useState("");

  const setDisabled = (date, index) => {
    if (resultDate === "" && index === result.Previous.length - 1) {
      return true
    }
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
          {!result.Previous ? <Loading /> :
            <>
              <ButtonArea>
                {result.Previous.map((prev, index) => {
                  let date = toDateTransform(prev)
                  return (
                    <Block key={index}>
                      <Button
                        type="pastDate"
                        onClick={() =>
                          setResultDate(date)
                        }
                        disabled={setDisabled(date, index)}
                      >
                        {`${date} 診断結果`}
                      </Button>
                    </Block>
                  )
                })}
              </ButtonArea>
              <Result date={resultDate} />
            </>}
        </Main>
      </Template>
    </>
  );
};

export default PastResult;
