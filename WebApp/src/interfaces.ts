export interface PredictionsResponse {
  cityData: {
    nome: string;
    populacao: string;
  };
  dateReport: {
    casos: number;
    obitos: number;
    recuperados: number;
    investigacao: number;
    dia: string;
  };
  offsetReport: {
    casos: number;
    obitos: number;
    recuperados: number;
    investigacao: number;
    dia: string;
  };
  offset: number;
  predictions: [
    {
      dia: string;
      suscetiveis: number;
      infectados: number;
      removidos: number;
      recuperados: number;
      obitos: number;
    }
  ];
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
  height: number;
  width: number;
}
