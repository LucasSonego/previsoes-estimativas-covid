import React from "react";
import { Line } from "react-chartjs-2";

import { Container } from "./styles";
import { ChartData } from "./interfaces";

const Component: React.FC<ChartData> = props => {
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
            y: {
              ticks: {
                stepSize: 1,
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 15,
              },
            },
          },
        }}
      />
    </Container>
  );
};

export default React.memo(Component);
