interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
  height?: number;
  width?: number;
}
