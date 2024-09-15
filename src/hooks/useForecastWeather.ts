require("dotenv").config();
import { useEffect, useState } from "react";
import { IWeeklyWeatherData } from "../interfaces/IWeeklyWeatherData";
import { IWeeklyTransformedWeatherData } from "../interfaces/IWeeklyTransformedWeatherData";
import { IHourlyPrecipitation } from "../interfaces/IHourlyPrecipitation";
import { IDailyWeatherData } from "../interfaces/IDailyWeatherData";
// import { temporaryWeeklyWeatherData } from "../testData/temporaryWeeklyWeatherData";

export function useForecastWeather() {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const latitude: string | null = import.meta.env.VITE_LATITUDE;
  const longitude: string | null = import.meta.env.VITE_LONGITUDE;

  const [weather, setWeather] = useState<IWeeklyWeatherData | null>(null);
  const [hourlyPrecipitation, setHourlyPrecipitation] = useState<
    IHourlyPrecipitation[] | null
  >(null);
  const [dailyWeather, setDailyWeather] = useState<
    IWeeklyTransformedWeatherData[] | null
  >(null);

  useEffect(() => {
    // define function to fetch the forecast
    async function fetchForecast() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}`,
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        setWeather(jsonData);
        console.log("forecast resp", jsonData);
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
    // set hourly precipitation
    let newArrPrecip = weather?.list.slice(0, 5);
    setHourlyPrecipitation(newArrPrecip);

    //set weekly forecast
    function processWeatherData(data: any) {
      if (!data) return;
      const dailyData: any = {};

      data.list.forEach((entry: IDailyWeatherData) => {
        const date = entry.dt_txt.split(" ")[0]; // Extract the date part
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            weatherConditions: {},
            count: 0,
          };
        }
        // Collect temperatures and weather conditions
        dailyData[date].temps.push({
          min: entry.main.temp_min,
          max: entry.main.temp_max,
        });

        const weatherEvents = entry.weather[0].main;
        if (dailyData[date].weatherConditions[weatherEvents]) {
          dailyData[date].weatherConditions[weatherEvents]++;
        } else {
          dailyData[date].weatherConditions[weatherEvents] = 1;
        }

        dailyData[date].count++;
      });

      // Calculate average temps
      const results: IWeeklyTransformedWeatherData[] = [];
      Object.keys(dailyData).forEach((date) => {
        const dayData = dailyData[date];
        const temp_min = dayData.temps.reduce(
          (sum: number, val: any) => (sum > val.min ? val.min : sum),
          999999
        );
        const temp_max = dayData.temps.reduce(
          (sum: number, val: any) => (sum < val.max ? val.max : sum),
          0
        );

        // Find most frequent weather condition
        let mostFrequentWeather = "";
        let maxCount = 0;
        Object.keys(dayData.weatherConditions).forEach((condition) => {
          if (dayData.weatherConditions[condition] > maxCount) {
            maxCount = dayData.weatherConditions[condition];
            mostFrequentWeather = condition;
          }
        });

        results.push({
          dt_txt:
            new Date(`${date}T00:00:00`).toLocaleString("en-us", {
              weekday: "short",
            }) +
            " " +
            new Date(`${date}T00:00:00`).toLocaleString("en-us", {
              day: "numeric",
            }),
          temp_min,
          temp_max,
          weatherEvent: mostFrequentWeather,
        });
      });

      setDailyWeather(results);

      return;
    }

    processWeatherData(weather);
  }, [weather]);

  return {
    weather: weather,
    hourlyPrecipitation: hourlyPrecipitation,
    dailyWeather: dailyWeather,
  };
}
