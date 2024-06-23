require("dotenv").config();
import { useState, useEffect } from "react";

const CurrentDateAndTime = ({ weather }) => {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    function updateTime() {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
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
      <p>date</p>
      {date}
      <p>time</p>
      {time}
    </div>
  );
};

export default CurrentDateAndTime;
