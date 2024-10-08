require("dotenv").config();
import { useState, useEffect } from "react";

import styled from "styled-components";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";

interface Props {
  weather: ICurrentWeatherData;
}

const CurrentDateAndTime = ({ weather }: Props) => {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    function updateTime() {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      let minutes: any = currentTime.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var time = hours + ":" + minutes + " ";
      if (hours > 11) {
        time += "PM";
      } else {
        time += "AM";
      }

      setTime(time);
    }
    setInterval(updateTime, 1000);
  }, []);

  useEffect(() => {
    function getDate() {
      if (weather) {
        let unixTimestamp = weather.dt;
        const time = new Date(unixTimestamp * 1000);
        const dateString = time.toDateString();
        const dateWithRemovedYear = dateString.slice(0, -5);
        setDate(dateWithRemovedYear);
      }
    }
    getDate();
  }, [weather]);

  return (
    <Wrapper>
      <DateWrapper>{date}</DateWrapper>
      <Time>
        <SVG src="/time.svg"></SVG>

        {time && Number(time.slice(0, 2)) > 12 ? (
          <div>{time && Number(time.slice(0, 2)) - 12 + time.slice(2)}</div>
        ) : (
          <div>{time}</div>
        )}
      </Time>
    </Wrapper>
  );
};

export default CurrentDateAndTime;

const Wrapper = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
  text-transform: uppercase;
  align-text: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DateWrapper = styled.div`
  font-size: 60px;
  text-align: center;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 60px;
`;

const SVG = styled.img`
  width: 70px;
`;
