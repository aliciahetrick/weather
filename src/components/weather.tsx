require("dotenv").config();
import { useState, useEffect } from "react";

interface IWeather {
  current: any;
}

const Weather = () => {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const latitude: string | null = import.meta.env.VITE_LATITUDE;
  const longitude: string | null = import.meta.env.VITE_LONGITUDE;

  const [weather, setWeather] = useState<IWeather | null>(null);

  console.log("latitude", latitude);
  console.log("longitude", longitude);
  console.log("weather", weather);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_key}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log("data", data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h1>weather</h1>
      <h2>current time UTC</h2>
      {weather && <p>{weather.current.dt}</p>}
    </div>
  );
};

export default Weather;
