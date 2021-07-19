import React from "react";

import { ReportData } from "./interfaces";
import { Container, ExtraValue, Label, Value } from "./styles";

const Report: React.FC<ReportData> = props => {
  return (
    <Container>
      <h2>Boletim:</h2>
      <div className="row">
        <div className="cidade">
          <Label>Município</Label>
          <Value>{props.cidade}</Value>
        </div>

        <div className="casos right">
          <Label>Casos</Label>
          <Value>{props.casos}</Value>
        </div>
      </div>
      <div className="row">
        <div className="obitos">
          <Label>Óbitos</Label>
          <Value>{props.obitos}</Value>
          <ExtraValue>
            {((props.obitos / props.casos) * 100).toPrecision(3)}% dos casos
          </ExtraValue>
        </div>

        <div className="recuperados right">
          <Label>Recuperados</Label>
          <Value>{props.recuperados}</Value>
        </div>
      </div>

      <div className="row">
        <div className="investigacao">
          <Label>Em Investigação</Label>
          <Value>{props.investigacao}</Value>
        </div>

        <div className="data right">
          <Label>Data</Label>
          <Value>{props.data}</Value>
        </div>
      </div>
      <span className="fonte">fonte: Secretaria de Saúde do Paraná</span>
    </Container>
  );
};

export default Report;
