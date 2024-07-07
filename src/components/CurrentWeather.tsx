require("dotenv").config();
import { useState, useEffect } from "react";
import { TemporaryCurrentWeatherData } from "./TemporaryCurrentWeatherData";
import CurrentDateAndTime from "./DateAndTime";
import SunsetTime from "./SunsetTime";
import styled from "styled-components";

export interface ICurrentWeatherData {
  main: any;
  sys: any;
  dt: any;
}

const CurrentWeather = () => {
  //   const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  //   const latitude: string | null = import.meta.env.VITE_LATITUDE;
  //   const longitude: string | null = import.meta.env.VITE_LONGITUDE;

  const [weather, setWeather] = useState<ICurrentWeatherData | null>(null);

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
    <WrapperTop>
      <WrapperLeft>
        <CurrentDateAndTime weather={weather} />
        <SunsetTime weather={weather} />
      </WrapperLeft>
      <WrapperRight>
        <CurrentTemp>
          {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}
        </CurrentTemp>
        <MinAndMax>
          <Min>
            Min {weather && <div>{Math.floor(weather.main.temp_min)}</div>}
          </Min>
          <Max>
            Max {weather && <div>{Math.floor(weather.main.temp_max)}</div>}
          </Max>
        </MinAndMax>
      </WrapperRight>
    </WrapperTop>
  );
};

export default CurrentWeather;

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WrapperLeft = styled.div`
  border: 1px solid green;
`;

const WrapperRight = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  border-radius: 2em;
`;

const CurrentTemp = styled.p`
  font-size: 250px;
  font-weight: 600;
  border: 1px solid black;
  margin-top: 0;
  margin-bottom: 0;
`;

const MinAndMax = styled.div`
  // display: "flex";
  // flex-direction: row;
  border: 1px solid red;
  text-align: center;
`;

const Min = styled.div`
  font-size: 30px;
  font-weight: 600;
  border: 1px solid purple;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const Max = styled.div`
  font-size: 30px;
  font-weight: 600;
  border: 1px solid purple;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;
