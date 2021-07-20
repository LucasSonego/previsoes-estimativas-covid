import React from "react";

import { Container } from "./styles";

const LoadingAnimation: React.FC = () => {
  return (
    <Container>
      <h2>Gerando Previsão...</h2>
      <h3>Este processo dura em torno de 40 segundos</h3>
      <div className="wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
    </Container>
  );
};

export default LoadingAnimation;
