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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
);

const Chart = ({ hourlyPrecipitation }) => {
  console.log("chart weather", hourlyPrecipitation);

  const [precipTime, setPrecipTime] = useState<any>(null);
  const [precipPercent, setPrecipPercent] = useState<any>(null);

  useEffect(() => {
    function setPrecipTimeArr(precipData: string | any[]) {
      let precipTimeArr = [];
      let precipPercentArr = [];
      for (let i = 0; i < precipData.length; i++) {
        const dt = precipData[i].dt;
        if (new Date(dt * 1000).getHours() > 12) {
          const time = new Date(dt * 1000).getHours() - 12 + " PM";
          precipTimeArr.push(time);
          precipPercentArr.push(precipData[i].pop * 100);
        } else {
          const time = new Date(dt * 1000).getHours() + " AM";
          precipTimeArr.push(time);
          precipPercentArr.push(precipData[i].pop * 100);
        }
      }
      setPrecipTime(precipTimeArr);
      setPrecipPercent(precipPercentArr);
    }
    hourlyPrecipitation && setPrecipTimeArr(hourlyPrecipitation);
  }, []);

  const data = {
    labels: precipTime,
    datasets: [
      {
        label: "Precipitation",
        data: precipPercent,
        backgroundColor: "pink",
        borderColor: "red",
        pointRadius: 0,
        pointBorderColor: "green",
        // fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
      //   filler: true,
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: Math.round,
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        display: false,
        gridLines: {
          drawsBorder: false,
          display: false,
        },
      },
      x: {
        min: 0,
        max: 100,
        border: {
          display: false,
        },

        // display: false,
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      //   yAxes: [
      //     {
      //       gridLines: {
      //         drawBorder: false,
      //         display: false,
      //       },
      //     },
      //   ],
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
