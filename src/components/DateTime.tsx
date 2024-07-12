require("dotenv").config();
import { useState, useEffect } from "react";
import { ICurrentWeatherData } from "./Current";
import styled from "styled-components";

interface Props {
  weather: ICurrentWeatherData;
}

const CurrentDateAndTime = ({ weather }: Props) => {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    function updateTime() {
      const currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes: any = currentTime.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (hours > 11) {
        time += "PM";
        if (hours > 13) {
          hours = hours - 12;
        }
      } else {
        time += "AM";
        if (hours > 13) {
          hours = hours - 12;
        }
      }
      var time = hours + ":" + minutes + " ";
      setTime(time);
    }
    setInterval(updateTime);
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
      <div>{date}</div>
      <div>{time}</div>
    </Wrapper>
  );
};

export default CurrentDateAndTime;

const Wrapper = styled.div`
  font-size: 100px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
`;
