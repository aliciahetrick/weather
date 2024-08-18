require("dotenv").config();
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";

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
    <Wrapper>
      <SVG src="/sunset.svg"></SVG>
      {weather && sunsetTime && Number(sunsetTime.slice(0, 2)) > 12 ? (
        <div>{Number(sunsetTime.slice(0, 2)) - 12 + sunsetTime.slice(2)}</div>
      ) : (
        <div>{sunsetTime}</div>
      )}
    </Wrapper>
  );
};

export default SunsetTime;

const Wrapper = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  font-size: 60px;
`;

const SVG = styled.img`
  width: 70px;
`;
