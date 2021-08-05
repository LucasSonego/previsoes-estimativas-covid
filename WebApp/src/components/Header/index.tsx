import React from "react";

import { Container } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <div className="center">
        <h2>Previsões Covid</h2>
        <div className="hr"></div>
        <p>
          Ferramenta de previsão da COVID-19 para cidades do Paraná desenvolvida
          no âmbito do projeto de pesquisa Matemática Aplicada e Computacional
          da Universidade Federal do Paraná - Setor Palotina.
        </p>
      </div>
    </Container>
  );
};

export default Header;
