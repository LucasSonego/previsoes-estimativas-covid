import React, { useState } from "react";
import api from "./services/api";

import { Wrapper, Container, Row } from "./styles";
import { PredictionsResponse } from "./interfaces";
import Chart from "./components/Chart";
import { ChartData } from "./components/Chart/interfaces";
import { ReportData } from "./components/Report/interfaces";
import Report from "./components/Report";
import CitiesDropdown from "./components/CitiesDropdown";
import LoadingAnimation from "./components/LoadingAnimation";
import Footer from "./components/Footer";
import About from "./components/About";
import Header from "./components/Header";

const App: React.FC = () => {
  let [city, setCity] = useState("");
  let [loading, setLoading] = useState(false);
  let [reportData, setReportData] = useState<ReportData>();
  let [deathsChartData, setDeathsChartData] = useState<ChartData>();
  let [infectedChartData, setInfectedChartData] = useState<ChartData>();
  let [healedChartData, setHealedChartData] = useState<ChartData>();

  async function getPrediction() {
    if (!city) return;
    setLoading(true);
    let date = new Date();
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    console.log(`${day}_${month}_${date.getFullYear()}`);
    let response = await api.get("/previsoes", {
      params: {
        cidade: city,
        data: `${day}_${month}_${date.getFullYear()}`,
        offset: 14,
      },
    });

    let data: PredictionsResponse;
    if (response.data) {
      data = response.data;
      console.log(data);
    } else return;

    setReportData({
      cidade: data.cityData.nome,
      casos: data.dateReport.casos,
      obitos: data.dateReport.obitos,
      recuperados: data.dateReport.recuperados,
      investigacao: data.dateReport.investigacao,
      data: data.dateReport.dia.replace("_", "/").replace("_", "/"),
    });

    let chartLabels: string[] = data.predictions.map(prediction => {
      let date = new Date(prediction.dia);
      return `${Intl.DateTimeFormat("pt", { day: "2-digit" }).format(
        date
      )} ${Intl.DateTimeFormat("pt", { month: "short" }).format(date)}`;
    });
    let chartDeaths: number[] = data.predictions.map(
      prediction => prediction.obitos
    );
    let chartInfected: number[] = data.predictions.map(
      prediction => prediction.infectados
    );
    let chartHealed: number[] = data.predictions.map(
      prediction => prediction.recuperados
    );

    setDeathsChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Mortes",
          data: chartDeaths,
          backgroundColor: "#e74d3c81",
        },
      ],
    });
    setInfectedChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Infectados",
          data: chartInfected,
          backgroundColor: "#e78f3c81",
        },
      ],
    });
    setHealedChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Recuperados",
          data: chartHealed,
          backgroundColor: "#4ae73c81",
        },
      ],
    });

    setLoading(false);
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <div className="city-select">
          <CitiesDropdown value={city} onChange={setCity} />
          <button
            className="generate-prediction"
            onClick={() => getPrediction()}
          >
            Gerar Previsão
          </button>
        </div>
        <Row>
          {reportData && (
            <Report
              cidade={reportData.cidade}
              casos={reportData.casos}
              obitos={reportData.obitos}
              recuperados={reportData.recuperados}
              investigacao={reportData.investigacao}
              data={reportData.data}
            />
          )}
          {deathsChartData && (
            <Chart
              labels={deathsChartData.labels}
              datasets={deathsChartData.datasets}
            />
          )}
        </Row>
        <Row>
          {infectedChartData && (
            <Chart
              labels={infectedChartData.labels}
              datasets={infectedChartData.datasets}
            />
          )}
          {healedChartData && (
            <Chart
              labels={healedChartData.labels}
              datasets={healedChartData.datasets}
            />
          )}
        </Row>
        {loading && <LoadingAnimation />}
      </Container>
      <About />
      <Footer />
    </Wrapper>
  );
};

export default App;
