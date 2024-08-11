import { useEffect, useState } from "react";
import { IWeeklyWeatherData } from "../interfaces/IWeeklyWeatherData";
import { IHourlyPrecipitation } from "../interfaces/IHourlyPrecipitation";
import { IDailyWeatherData } from "../interfaces/IDailyWeatherData";
import { temporaryWeeklyWeatherData } from "../testData/sTemporaryWeeklyWeatherData";

export function useForecastWeather() {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  //   const units = "imperial";

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
    setWeather(temporaryWeeklyWeatherData);
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

  return {
    weather: weather,
    hourlyPrecipitation: hourlyPrecipitation,
    dailyWeather: dailyWeather,
  };
}
