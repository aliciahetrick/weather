require("dotenv").config();
import { useState, useEffect } from "react";

interface IWeather {
  current: any;
  daily: any;
}

const Weather = () => {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const latitude: string | null = import.meta.env.VITE_LATITUDE;
  const longitude: string | null = import.meta.env.VITE_LONGITUDE;
  const units: string = "imperial";

  const [weather, setWeather] = useState<IWeather | null>(null);
  const [date, setDate] = useState<string | null>(null);

  console.log("weather", weather);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    function getDate() {
      if (weather) {
        let unixTimestamp = weather.current.dt;
        const time = new Date(unixTimestamp * 1000);
        const dateString = time.toDateString();
        const dateWithRemovedYear = dateString.slice(0, -5);
        const dateWithoutDayOfWeek = dateWithRemovedYear
          .split(" ")
          .slice(1)
          .join(" ");
        setDate(dateWithoutDayOfWeek);
      }
    }
    getDate();
  }, [weather]);

  return (
    <div>
      {/* <h2>current temp</h2> */}
      {weather && <p>{Math.floor(weather.current.temp)}</p>}
      <h2>Min</h2>
      {weather && <p>{Math.floor(weather.daily[0].temp.min)}</p>}
      <h2>Max</h2>
      {weather && <p>{Math.floor(weather.daily[0].temp.max)}</p>}

      <h2>Date</h2>
      {weather && <p>{date}</p>}
    </div>
  );
};

export default Weather;
