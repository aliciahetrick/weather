require("dotenv").config();
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // yaxis
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Chart = () => {
  const data = {
    labels: ["Mon", "Tues", "Wed"],
    datasets: [
      {
        label: "Sales of the week",
        data: [6, 3, 9],
        backgroundColor: "pink",
        borderColor: "black",
        pointBorderColor: "green",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <>
      <p>chart</p>
      <div style={{ width: "600px", height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default Chart;
