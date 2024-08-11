require("dotenv").config();
import DateTime from "./DateTime";
import SunsetTime from "./Sunset";
import styled from "styled-components";
import { useCurrentWeather } from "../hooks/useCurrentWeather";

const Today = () => {
  // console.log("weatherfdj", weather.weather[0].main);

  const weather = useCurrentWeather();

  return (
    <>
      <Title>Current</Title>
      <Wrapper>
        <WrapperLeft>
          {/* <WrapperTop> */}
          {weather && <div>{Math.floor(weather.main.temp)}&deg;</div>}
          {/* </WrapperTop> */}
        </WrapperLeft>
        <WrapperMiddle>
          {weather && (
            <WeatherEvent>{weather.weather[0].description}</WeatherEvent>
          )}
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
        </WrapperMiddle>
        <WrapperRight>
          <DateTime weather={weather} />
          <SunsetTime weather={weather} />
        </WrapperRight>
      </Wrapper>
    </>
  );
};

export default Today;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WeatherEvent = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WrapperLeft = styled.div`
  font-size: 200px;
  font-weight: 600;
  display: flex;
  align-items: center;
  // margin-right: 600px;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`;

const WrapperMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2em;
  font-size: 80px;
  // padding-top: 50px;
  text-align: right;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding: 0.5em;
`;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2em;
  font-size: 80px;
  // padding-top: 50px;
  text-align: right;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 3px 3px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding: 0.5em;
`;

const SVG = styled.img`
  width: 100px;
`;
