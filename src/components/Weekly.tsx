require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryWeeklyWeatherData } from "./TemporaryWeeklyWeatherData";
import styled from "styled-components";

export interface IWeeklyWeatherData {
  list: any[];
}

export interface IDailyWeatherData {}

const Weekly = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  //   const units = "imperial";

  const [weather, setWeather] = useState<IWeeklyWeatherData | null>(null);
  const [dailyWeather, setDailyWeather] = useState<IDailyWeatherData | null>(
    null
  );

  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  console.log("weekly weather", weather);
  //   console.log("dt", weather.list[0].dt);

  //   const date = new Date(weather.list[0].dt) * 1000)
  //   console.log("dt type", new Date(weather.list[0].dt * 1000));

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

  useEffect(() => {
    let newArr = weather?.list.filter(function (value, index) {
      return index % 8 == 0;
    });
    setDailyWeather(newArr);
  }, [weather]);

  return (
    <Wrapper>
      {dailyWeather &&
        dailyWeather.map((listItem) => {
          return (
            <WeeklyWeatherCard>
              {dayNames[new Date(listItem.dt * 1000).getDay()]}
              {"  " + new Date(listItem.dt * 1000).getDate()}
              <p>{Math.floor(listItem.main.temp)}</p>
              <p>Min: {listItem.main.temp_min}</p>
              <p>Max: {listItem.main.temp_max}</p>
            </WeeklyWeatherCard>
          );
        })}
    </Wrapper>
  );
};

export default Weekly;

const Wrapper = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const WeeklyWeatherCard = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// const WrapperLeft = styled.div`
//   border: 1px solid green;
// `;

// const WrapperRight = styled.div`
//   border: 1px solid blue;
// `;
