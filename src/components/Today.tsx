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

  // console.log("weatherfdj", weather.weather[0].main);

  return (
    <>
      <Title>Current</Title>
      <Wrapper>
        <WrapperLeft>
          {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}
        </WrapperLeft>
        <WrapperMiddle>
          {weather && (
            <WeatherEvent>{weather.weather[0].description}</WeatherEvent>
          )}
          {weather && weather.weather[0].main === "Clouds" && (
            <SVG src="/cloud.svg"></SVG>
          )}
          {weather && weather.weather[0].main === "Rain" && (
            <SVG src="/rain.svg"></SVG>
          )}
          {weather && weather.weather[0].main === "Snow" && (
            <SVG src="/snow.svg"></SVG>
          )}
          {weather && weather.weather[0].main === "Clear" && (
            <SVG src="/sun.svg"></SVG>
          )}
        </WrapperMiddle>
        <WrapperRight>
          <DateTime weather={weather} />
          <SunsetTime weather={weather} />
        </WrapperRight>
      </Wrapper>
    </>
  );
};

export default Today;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WeatherEvent = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WrapperLeft = styled.div`
  font-size: 200px;
  font-weight: 600;
  display: flex;
  align-items: center;
  // margin-right: 600px;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`;

const WrapperMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2em;
  font-size: 80px;
  // padding-top: 50px;
  text-align: right;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding: 0.5em;
`;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2em;
  font-size: 80px;
  // padding-top: 50px;
  text-align: right;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding: 0.5em;
`;

const SVG = styled.img`
  width: 100px;
`;
