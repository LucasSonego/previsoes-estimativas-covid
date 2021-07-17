import React, { useState } from "react";
import api from "./services/api";

import { Container } from "./styles";
import { PredictionsResponse, ChartData } from "./interfaces";
import Chart from "./components/Chart";

const App: React.FC = () => {
  let [city, setCity] = useState("");
  let [date, setDate] = useState("");
  let [deathsChartData, setDeathsChartData] = useState<ChartData>();
  let [infectedChartData, setInfectedChartData] = useState<ChartData>();
  let [healedChartData, setHealedChartData] = useState<ChartData>();

  async function getPrediction() {
    let response = await api.get("/previsoes", {
      params: {
        cidade: city,
        data: date,
        offset: 7,
      },
    });

    let data: PredictionsResponse;
    if (response.data) {
      data = response.data;
      console.log(data);
    } else return;

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
      height: 400,
      width: 600,
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
      height: 400,
      width: 600,
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
      height: 400,
      width: 600,
    });

    setLoading(false);
  }

  return (
    <Container>
      <input
        type="text"
        value={city}
        onChange={event => setCity(event.target.value)}
        placeholder="cidade"
      />
      <input
        type="text"
        value={date}
        onChange={event => setDate(event.target.value)}
        placeholder="data"
      />
      <button onClick={() => getPrediction()}>Dale</button>
      {deathsChartData && (
        <Chart
          labels={deathsChartData.labels}
          datasets={deathsChartData.datasets}
          height={400}
          width={600}
        />
      )}
      <div className="charts">
        {infectedChartData && (
          <Chart
            labels={infectedChartData.labels}
            datasets={infectedChartData.datasets}
            height={400}
            width={600}
          />
        )}
        {healedChartData && (
          <Chart
            labels={healedChartData.labels}
            datasets={healedChartData.datasets}
            height={400}
            width={600}
          />
        )}
      </div>
    </Container>
  );
};

export default App;
