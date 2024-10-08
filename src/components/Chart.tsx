require("dotenv").config();
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { IHourlyPrecipitation } from "../interfaces/IHourlyPrecipitation";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels,
  Title
);

interface Props {
  hourlyPrecipitation: IHourlyPrecipitation[];
}

const Chart = ({ hourlyPrecipitation }: Props) => {
  // console.log("chart weather", hourlyPrecipitation);

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
  }, [hourlyPrecipitation]);

  const data = {
    labels: precipTime,
    datasets: [
      {
        label: "Precipitation",
        data: precipPercent,
        borderColor: "#d28fff",
        pointRadius: 0,
        borderWidth: 10,
        tension: 0.4,
      },
    ],
  };

  const options: any = {
    plugins: {
      title: {
        display: true,
        text: "PRECIPITATION",
        color: "white",
        font: {
          size: 35,
          weight: 600,
          family: "Rubik Variable",
        },
      },
      legend: true,
      //   filler: true,
      datalabels: {
        color: "white",
        anchor: "end",
        align: "top",
        formatter: function (value: number) {
          return Math.round(value) + "%";
        },
        font: {
          size: 20,
          weight: 600,
          family: "Rubik Variable",
        },
      },
    },
    scales: {
      y: {
        min: -5,
        max: 120,
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
        ticks: {
          color: "white",
          font: {
            size: 20,
            weight: 600,
            family: "Rubik Variable",
          },
        },
      },
    },
  };

  return (
    <>
      <Wrapper>
        <Line data={data} options={options} />
      </Wrapper>
    </>
  );
};

export default Chart;

const Wrapper = styled.div`
  width: 650px;
  height: 350px;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 5px 5px #d28fff;
  border-radius: 1em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  // border: 1px solid black;
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
`;
