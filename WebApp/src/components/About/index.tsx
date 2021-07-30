import React from "react";

import { Container } from "./styles";
import exemplo from "../../assets/exemplo.svg";

const About: React.FC = () => {
  return (
    <Container>
      <img src={exemplo} alt="" srcSet="" />
      <p>
        A previsão tem como base o Modelo Matemático SIR (Suscetíveis →
        Infectados → Removidos). Coletamos os dados dos últimos 14 dias e
        calibramos os parâmetros do modelo para capturar o comportamento da
        epidemia neste período. Encontrados os parâmetros, assumimos que o
        comportamento futuro dependerá destes mesmos valores e, assim, geramos a
        previsão.
      </p>
    </Container>
  );
};

export default About;
