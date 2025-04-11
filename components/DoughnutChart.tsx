"use client";

import { Chart, ArcElement, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  Chart.register(ArcElement, Tooltip);

  const data = {
    labels: ["Bank 1", "Bank 2", "Bank 3"],
    datasets: [
      {
        id: 1,
        label: "Banks",
        data: [5, 6, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
      {
        id: 2,
        label: "",
        data: [3, 2, 1],
        backgroundColor: ["#AA6384", "#36F2EB", "#BACE56"],
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{ cutout: "60%", plugins: { legend: { display: false } } }}
    />
  );
};

export default DoughnutChart;
