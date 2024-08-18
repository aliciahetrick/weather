require("dotenv").config();
import DateTime from "./DateTime";
import SunsetTime from "./Sunset";
import styled from "styled-components";
import { ICurrentWeatherData } from "../interfaces/ICurrentWeatherData";

interface Props {
  weather: ICurrentWeatherData;
}

const Times = ({ weather }: Props) => {
  return (
    <>
      <WrapperRight>
        <DateTime weather={weather} />
        <SunsetTime weather={weather} />
      </WrapperRight>
    </>
  );
};

export default Times;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const WeatherEvent = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const SVG = styled.img`
  width: 100px;
`;
