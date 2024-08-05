require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryWeeklyWeatherData } from "./TemporaryWeeklyWeatherData";
import styled from "styled-components";
import Chart from "./Chart";

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

  console.log("daily weather", dailyWeather);

  return (
    <WrapperColumns>
      <div>
        <Chart hourlyPrecipitation={hourlyPrecipitation} />
        <WrapperForecast>
          <Title>Precipitation</Title>
          <WrapperRows>
            {hourlyPrecipitation &&
              hourlyPrecipitation.map((listItem) => {
                if (new Date(listItem.dt * 1000).getHours() > 12) {
                  return (
                    <WeeklyWeatherCard>
                      {"  " +
                        (new Date(listItem.dt * 1000).getHours() - 12) +
                        " PM"}
                      <div>{listItem.pop * 100}%</div>
                    </WeeklyWeatherCard>
                  );
                }
                return (
                  <WeeklyWeatherCard>
                    {"  " + new Date(listItem.dt * 1000).getHours() + " AM"}
                    <div>{listItem.pop * 100}%</div>
                  </WeeklyWeatherCard>
                );
              })}
          </WrapperRows>
        </WrapperForecast>
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
