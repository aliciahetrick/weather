require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryWeeklyWeatherData } from "./TemporaryWeeklyWeatherData";
import styled from "styled-components";

export interface IWeeklyWeatherData {
  list: any;
}

const Weekly = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  //   const units = "imperial";

  const [weather, setWeather] = useState<IWeeklyWeatherData | null>(null);

  console.log("weekly weather", weather);

  //   useEffect(() => {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units}`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setWeather(data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, []);

  useEffect(() => {
    setWeather(TemporaryWeeklyWeatherData);
  }, []);

  return (
    <>
      {weather &&
        weather?.list.map((listItem) => {
          return (
            <WeeklyWeatherCard>
              {Math.floor(listItem.main.temp)}
            </WeeklyWeatherCard>
          );
        })}
    </>
  );
};

export default Weekly;

const WeeklyWeatherCard = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

// const WrapperLeft = styled.div`
//   border: 1px solid green;
// `;

// const WrapperRight = styled.div`
//   border: 1px solid blue;
// `;
