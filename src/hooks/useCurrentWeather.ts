require("dotenv").config();
import { useEffect, useState } from "react";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";
import { temporaryCurrentWeatherData } from "../testData/temporaryCurrentWeatherData";

export function useCurrentWeather() {
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
    setWeather(temporaryCurrentWeatherData);
    // }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    // return () => clearInterval(fetchDataInterval);
  }, []);

  return weather;
}
