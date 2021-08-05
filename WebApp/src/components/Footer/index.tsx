import React from "react";

import { Container } from "./styles";
import ufprLogo from "../../assets/UFPR-palotina.png";
import ExpandingLabel from "../ExpandingLabel";

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="content">
        <a
          href="http://www.palotina.ufpr.br/portal/"
          target="_blank"
          rel="noreferrer"
          className="logo-ufpr"
        >
          <img src={ufprLogo} alt="UFPR Setor Palotina" srcSet="" />
        </a>
        <div className="section">
          <h3>Modelagem Matemática</h3>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Rodrigo André Schulz</h4>
              <span>Pesquisador - UFPR Palotina </span>
              <a href="mailto:rodrigo.schulz@ufpr.br">rodrigo.schulz@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="90px">
            <div className="people">
              <h4>Samuel Willian Schwertner Costiche</h4>
              <span>
                Discente do Curso Licenciatura em <br />
                Ciências Exatas - UFPR - Palotina
              </span>
              <a href="mailto:samuel.costiche@ufpr.br">
                samuel.costiche@ufpr.br
              </a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Carlos Henrique Coimbra de Araujo</h4>
              <span>Pesquisador - UFPR Palotina</span>
              <a href="mailto:carlos.coimbra@ufpr.br">carlos.coimbra@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Alexandre Luis Trovon de Carvalho</h4>
              <span>Pesquisador - UFPR - Curitiba</span>
              <a href="mailto:trovon@ufpr.br">trovon@ufpr.br</a>
            </div>
          </ExpandingLabel>
        </div>
        <div className="section">
          <h3>Desenvolvimento da Aplicação</h3>
          <ExpandingLabel maxHeight="105px">
            <div className="people">
              <h4>Lucas Sônego Candiotto</h4>
              <span>
                Discente do Curso Licenciatura em <br />
                Computação - UFPR Palotina
              </span>
              <a
                href="https://github.com/LucasSonego"
                target="_blank"
                rel="noreferrer"
              >
                github.com/LucasSonego
              </a>
              <a href="mailto:lucassonego@ufpr.br">lucassonego@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="105px">
            <div className="people">
              <h4>Gabriel Angelo Cerutti</h4>
              <span>
                Discente do Curso Licenciatura em <br />
                Computação - UFPR Palotina
              </span>
              <a
                href="https://github.com/bill1300"
                target="_blank"
                rel="noreferrer"
              >
                github.com/bill1300
              </a>
              <a href="mailto:gabrielangelo@ufpr.br">gabrielangelo@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Marcos Antonio Schreiner</h4>
              <span>Pesquisador - UFPR Palotina</span>
              <a href="mailto:marcosantonio@ufpr.br">marcosantonio@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Anderson da Silva Marcolino</h4>
              <span>Pesquisador - UFPR Palotina</span>
              <a href="mailto:anderson.marcolino@ufpr.br">
                anderson.marcolino@ufpr.br
              </a>
            </div>
          </ExpandingLabel>
        </div>
        <div className="section">
          <h3>Testes e Estimativas de Erros</h3>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Victoria Carraro Bernardes da Silva</h4>
              <span>Iniciação Científica Junior - UFPR</span>
              <a href="mailto:victoria.carraro@ufpr.br">
                victoria.carraro@ufpr.br
              </a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Willian dos Santos da Luz</h4>
              <span>Iniciação Científica Junior - UFPR</span>
              <a href="mailto:williansantos@ufpr.br">williansantos@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Stéphanie Patel Pasqualoto</h4>
              <span>Iniciação Científica Junior - UFPR</span>
              <a href="mailto:stephanipatel@ufpr.br">stephanipatel@ufpr.br</a>
            </div>
          </ExpandingLabel>
          <ExpandingLabel maxHeight="70px">
            <div className="people">
              <h4>Daniel Henrique Berger</h4>
              <span>Iniciação Científica Junior - UFPR</span>
              <a href="mailto:daniel.berger@ufpr.br">daniel.berger@ufpr.br</a>
            </div>
          </ExpandingLabel>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
