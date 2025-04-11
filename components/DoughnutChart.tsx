"use client";

import { Chart, ArcElement } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  Chart.register(ArcElement);

  const data = {
    laberls: ["Bank 1", "Bank 2", "Bank 3"],
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
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
