require("dotenv").config();
import styled from "styled-components";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";

interface Props {
  weather: ICurrentWeatherData;
}

const Temperature = ({ weather }: Props) => {
  return (
    <>
      <Wrapper>
        {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}

        {weather && weather.weather[0].main === "Clouds" && (
          <SVG src="/cloud.svg"></SVG>
        )}
        {weather && weather.weather[0].main === "Rain" && (
          <SVG src="/rain.svg"></SVG>
        )}
        {weather && weather.weather[0].main === "Snow" && (
          <SVG src="/snow.svg"></SVG>
        )}
        {weather && weather.weather[0].main === "Clear" && (
          <SVG src="/sun.svg"></SVG>
        )}

        {weather && (
          <WeatherEvent>{weather.weather[0].description}</WeatherEvent>
        )}
      </Wrapper>
    </>
  );
};

export default Temperature;

const WeatherEvent = styled.div`
  font-size: 40px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  font-size: 150px;
  font-weight: 600;
  display: flex;
  //   gap: 10px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.15em;
  // margin: 2em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`;

const SVG = styled.img`
  width: 100px;
`;
