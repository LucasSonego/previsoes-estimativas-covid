import React, { useState } from "react";
import api from "./services/api";

import { Container } from "./styles";
import { PredictionsResponse } from "./interfaces";

const App: React.FC = () => {
  let [city, setCity] = useState("");
  let [date, setDate] = useState("");

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
    </Container>
  );
};

export default App;
