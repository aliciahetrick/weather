require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryCurrentWeatherData } from "./TemporaryCurrentWeatherData";
import CurrentDateAndTime from "./DateTimeSunset";
import SunsetTime from "./SunsetTime";

// interface IWeather {
//   current: any;
//   daily: any;
// }

interface ITemporaryCurrentWeatherData {
  main: any;
}

const CurrentWeather = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  //   const units: string = "imperial";

  //   const [weather, setWeather] = useState<IWeather | null>(null);
  const [weather, setWeather] = useState<ITemporaryCurrentWeatherData | null>(
    null
  );

  console.log("weather", weather);

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
    setWeather(TemporaryCurrentWeatherData);
  }, []);

  return (
    <div>
      <h2>Current temp</h2>
      {weather && <p>{Math.floor(weather.main.temp)}</p>}
      <h2>Min</h2>
      {weather && <p>{Math.floor(weather.main.temp_min)}</p>}
      <h2>Max</h2>
      {weather && <p>{Math.floor(weather.main.temp_max)}</p>}

      <CurrentDateAndTime weather={weather} />
      <SunsetTime weather={weather} />
    </div>
  );
};

export default CurrentWeather;
