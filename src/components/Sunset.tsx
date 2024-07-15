require("dotenv").config();
import { useState, useEffect } from "react";
import { ICurrentWeatherData } from "./Today";

interface Props {
  weather: ICurrentWeatherData;
}

const SunsetTime = ({ weather }: Props) => {
  const [sunsetTime, setSunsetTime] = useState<any | null>(null);

  useEffect(() => {
    function getSunsetTime() {
      if (weather) {
        let unixTimestamp = weather?.sys.sunset;
        const date = new Date(unixTimestamp * 1000);

        const hours = date.getHours();
        let minutes: any = date.getMinutes();

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        let time = hours + ":" + minutes + " ";
        if (hours > 11) {
          time += "PM";
        } else {
          time += "AM";
        }
        setSunsetTime(time);
      }
    }
    getSunsetTime();
  }, [weather]);

  return (
    <div>
      {weather && Number(sunsetTime.slice(0, 2)) > 12 ? (
        <div>{Number(sunsetTime.slice(0, 2)) - 12 + sunsetTime.slice(2)}</div>
      ) : (
        <div>{sunsetTime}</div>
      )}
    </div>
  );
};

export default SunsetTime;
