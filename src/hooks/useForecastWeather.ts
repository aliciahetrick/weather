require("dotenv").config();
import { useEffect, useState } from "react";
import { IWeeklyWeatherData } from "../interfaces/IWeeklyWeatherData";
import { IHourlyPrecipitation } from "../interfaces/IHourlyPrecipitation";
import { IDailyWeatherData } from "../interfaces/IDailyWeatherData";
import { temporaryWeeklyWeatherData } from "../testData/temporaryWeeklyWeatherData";

export function useForecastWeather() {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const latitude: string | null = import.meta.env.VITE_LATITUDE;
  const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  const units = "imperial";

  const [weather, setWeather] = useState<IWeeklyWeatherData | null>(null);
  const [hourlyPrecipitation, setHourlyPrecipitation] = useState<
    IHourlyPrecipitation[] | null
  >(null);
  const [dailyWeather, setDailyWeather] = useState<IDailyWeatherData[] | null>(
    null
  );

  useEffect(() => {
    // define function to fetch the forecast
    async function fetchForecast() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units}`,
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        setWeather(jsonData);
        console.log("fetched forecast");
      } catch (error) {
        console.log("error", error);
      }
    }

    // sets weather on mount
    fetchForecast();

    // re-sets weather every x miliseconds
    // 1800000 ms = 30 minutes
    let timer = setInterval(() => fetchForecast(), 1800000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // // use hardcoded data
  // useEffect(() => {
  //   setWeather(temporaryWeeklyWeatherData);
  // }, []);

  useEffect(() => {
    let newArrDaily = weather?.list.filter(function (_value, index) {
      return index % 8 == 0;
    });
    setDailyWeather(newArrDaily);

    let newArrPrecip = weather?.list.slice(0, 5);
    setHourlyPrecipitation(newArrPrecip);
  }, [weather]);

  return {
    weather: weather,
    hourlyPrecipitation: hourlyPrecipitation,
    dailyWeather: dailyWeather,
  };
}
