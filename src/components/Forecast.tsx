require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryWeeklyWeatherData } from "./TemporaryWeeklyWeatherData";
import styled from "styled-components";

export interface IWeeklyWeatherData {
  list: any[];
}

export interface IHourlyPrecipitation {
  pop: number;
  dt: number;
}

export interface IDailyWeatherData {
  weather: any[];
  pop: number;
  dt: number;
  main: { temp_max: number; temp_min: number };
}

const Forecast = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  //   const units = "imperial";
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  const [weather, setWeather] = useState<IWeeklyWeatherData | null>(null);
  const [hourlyPrecipitation, setHourlyPrecipitation] = useState<
    IHourlyPrecipitation[] | null
  >(null);
  const [dailyWeather, setDailyWeather] = useState<IDailyWeatherData[] | null>(
    null
  );

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
    //fetches the weather every 3 hours
    // const fetchDataInterval = setInterval(() => {
    setWeather(TemporaryWeeklyWeatherData);
    // }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
    // return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    let newArrDaily = weather?.list.filter(function (_value, index) {
      return index % 8 == 0;
    });
    setDailyWeather(newArrDaily);

    let newArrPrecip = weather?.list.slice(0, 5);
    setHourlyPrecipitation(newArrPrecip);
  }, [weather]);

  return (
    <WrapperColumns>
      <WrapperRows>
        {hourlyPrecipitation &&
          hourlyPrecipitation.map((listItem) => {
            if (new Date(listItem.dt * 1000).getHours() > 12) {
              return (
                <WeeklyWeatherCard>
                  <div>{listItem.pop * 100}%</div>
                  {"  " +
                    (new Date(listItem.dt * 1000).getHours() - 12) +
                    " PM"}
                </WeeklyWeatherCard>
              );
            }
            return (
              <WeeklyWeatherCard>
                <div>{listItem.pop * 100}%</div>
                {"  " + new Date(listItem.dt * 1000).getHours() + " AM"}
              </WeeklyWeatherCard>
            );
          })}
      </WrapperRows>
      <WrapperRows>
        {dailyWeather &&
          dailyWeather.map((listItem) => {
            return (
              <WeeklyWeatherCard>
                {dayNames[new Date(listItem.dt * 1000).getDay()]}
                {"  " + new Date(listItem.dt * 1000).getDate()}
                <p>{listItem.weather[0].main}</p>
                <HighAndLowTemp>
                  <div>{Math.floor(listItem.main.temp_max)}</div>
                  <div>{Math.floor(listItem.main.temp_min)}</div>
                </HighAndLowTemp>
              </WeeklyWeatherCard>
            );
          })}
      </WrapperRows>
    </WrapperColumns>
  );
};

export default Forecast;

const WrapperColumns = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

const WrapperRows = styled.div`
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

const HighAndLowTemp = styled.div`
  display: flex;
  justify-content: space-around;
`;
