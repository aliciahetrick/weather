require("dotenv").config();
import { useState, useEffect } from "react";
import { temporaryWeeklyWeatherData } from "../testData/temporaryWeeklyWeatherData";
import styled from "styled-components";
import Chart from "./Chart";
import { useForecastWeather } from "../hooks/useForecastWeather";

const Forecast = () => {
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  const hourlyPrecipitation = useForecastWeather().hourlyPrecipitation;
  const dailyWeather = useForecastWeather().dailyWeather;

  return (
    <WrapperColumns>
      <div>
        <Chart hourlyPrecipitation={hourlyPrecipitation} />
        <WrapperForecast></WrapperForecast>
      </div>
      <div>
        <WrapperForecast>
          <Title>Forecast</Title>
          <WrapperRows>
            {dailyWeather &&
              dailyWeather.map((listItem) => {
                return (
                  <WeeklyWeatherCard>
                    {dayNames[new Date(listItem.dt * 1000).getDay()]}
                    {"  " + new Date(listItem.dt * 1000).getDate()}
                    {/* <SVG src="/cloud.svg"></SVG> */}
                    {listItem.weather[0].main === "Clouds" && (
                      <SVG src="/cloud.svg"></SVG>
                    )}
                    {listItem.weather[0].main === "Rain" && (
                      <SVG src="/rain.svg"></SVG>
                    )}
                    {listItem.weather[0].main === "Snow" && (
                      <SVG src="/snow.svg"></SVG>
                    )}
                    {listItem.weather[0].main === "Sun" && (
                      <SVG src="/sun.svg"></SVG>
                    )}
                    {/* <SVG src="/rain.svg"></SVG>
                <SVG src="/snow.svg"></SVG>
                <SVG src="/sun.svg"></SVG>  */}
                    <HighAndLowTemp>
                      <div>{Math.floor(listItem.main.temp_max)}</div>
                      <div>{Math.floor(listItem.main.temp_min)}</div>
                    </HighAndLowTemp>
                  </WeeklyWeatherCard>
                );
              })}
          </WrapperRows>
        </WrapperForecast>
      </div>
    </WrapperColumns>
  );
};

export default Forecast;

const WrapperColumns = styled.div`
  //   border: 1px solid red;
  display: flex;
  flex-direction: column;
  // border: 1px solid green;
`;

const WrapperRows = styled.div`
  // border: 5px solid #f1f1f8;
  // // box-shadow: 3px 3px #d28fff;
  border-radius: 0.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  // background-color: #ffdbbb;
  // padding-top: 0.25em;
  // padding-bottom: 0.25em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 60px;
  font-weight: 600;
  // margin-top: 30px;
  // margin-bottom: 30px;
  text-align: center;
`;

const WrapperForecast = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WeeklyWeatherCard = styled.div`
  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.5em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`;

const SVG = styled.img`
  width: 100px;
`;

const HighAndLowTemp = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 50px;
  // border: 1px solid green;
  width: 100%;
  // margin: 0;
  // padding: 0;
`;
