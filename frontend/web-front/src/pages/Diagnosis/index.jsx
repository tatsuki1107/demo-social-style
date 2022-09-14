import React from "react";
import Template, { Main } from "../../components/Templates";
import Typography from "../../components/Atoms/Typography";

const Diagnosis = () => {
  return (
    <>
      <Template>
        <Main>
          <div style={{ paddingTop: 100 }}>
            <Typography type="text" size="m" color="black">
              Diagnosis Page!!
            </Typography>
          </div>
        </Main>
      </Template>
    </>
  );
};

export default Diagnosis;
