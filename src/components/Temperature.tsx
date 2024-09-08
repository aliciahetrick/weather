require("dotenv").config();
import styled from "styled-components";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";

interface Props {
  weather: ICurrentWeatherData;
}

const Temperature = ({ weather }: Props) => {
  console.log("weather", weather);
  return (
    <>
      <Wrapper>
        <Temp>
          {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}
        </Temp>

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
  font-family: "Rubik Variable", sans-serif;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  font-size: 150px;
  font-weight: 600;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 5px 5px #d28fff;
  border-radius: 0.15em;
  //   padding-left: 0.25em;
  //   padding-right: 0.25em;

  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
`;

const Temp = styled.div`
  margin-bottom: -20px;
  margin-top: -20px;
`;

const SVG = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;
