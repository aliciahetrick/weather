require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryCurrentWeatherData } from "./TemporaryCurrentWeatherData";
import DateTime from "./DateTime";
import SunsetTime from "./Sunset";
import styled from "styled-components";

export interface ICurrentWeatherData {
  main: any;
  sys: any;
  dt: any;
  weather: any;
}

const Today = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;

  const [weather, setWeather] = useState<ICurrentWeatherData | null>(null);

  //   useEffect(() => {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units}`,
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
    //fetches the weather every 24 hours
    // const fetchDataInterval = setInterval(() => {
    setWeather(TemporaryCurrentWeatherData);
    // }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    // return () => clearInterval(fetchDataInterval);
  }, []);

  return (
    <Wrapper>
      <WrapperLeft>
        {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}
      </WrapperLeft>
      <WrapperRight>
        <DateTime weather={weather} />

        {weather && (
          <WeatherEvent>{weather.weather[0].description}</WeatherEvent>
        )}
        <SunsetTime weather={weather} />
      </WrapperRight>
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WeatherEvent = styled.div`
  font-size: 100px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WrapperLeft = styled.div`
  border: 1px solid green;
  font-size: 250px;
  font-weight: 600;
  border: 1px solid black;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

const WrapperRight = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  border-radius: 2em;
`;
