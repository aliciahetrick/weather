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
  justify-content: center;
  flex: 1;
  gap: 20px;
  font-size: 80px;

  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 5px 5px #d28fff;
  border-radius: 0.25em;
  // margin: 2em;
  padding: 0.5em;
`;
