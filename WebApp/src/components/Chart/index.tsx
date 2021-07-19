import React from "react";
import { Line } from "react-chartjs-2";

import { Container } from "./styles";
import { ChartData } from "./interfaces";

const chart: React.FC<ChartData> = props => {
  let datasets = props.datasets;
  let datasetsWithProps = datasets.map(dataset => {
    return { ...dataset, fill: "origin" };
  });

  return (
    <Container height={props.height} width={props.width}>
      <Line
        type="line"
        data={{
          labels: props.labels,
          datasets: datasetsWithProps,
        }}
        options={{
          responsive: true,
          title: { text: "", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </Container>
  );
};

export default chart;
