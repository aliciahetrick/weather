require("dotenv").config();
import { useEffect, useState } from "react";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";
// import { temporaryCurrentWeatherData } from "../testData/temporaryCurrentWeatherData";

export function useCurrentWeather() {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const latitude: string | null = import.meta.env.VITE_LATITUDE;
  const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  const units = "imperial";

  const [weather, setWeather] = useState<ICurrentWeatherData | null>(null);

  useEffect(() => {
    // define function to fetch the weather
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units}`,
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        setWeather(jsonData);
      } catch (error) {
        console.log("error", error);
      }
    }

    // sets weather on mount
    fetchWeather();

    // re-sets weather every x miliseconds
    // 1800000 ms = 30 minutes
    let timer = setInterval(() => fetchWeather(), 1800000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // use hardcoded data
  // useEffect(() => {
  //   setWeather(temporaryCurrentWeatherData);
  // }, []);

  return weather;
}
