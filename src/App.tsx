import CurrentWeather from "./components/Today";
import styled from "styled-components";

import "./App.css";
import Forecast from "./components/Forecast";

import Chart from "./components/Chart";
import { useForecastWeather } from "./hooks/useForecastWeather";

function App() {
  const hourlyPrecipitation = useForecastWeather().hourlyPrecipitation;
  return (
    <Wrapper>
      <Title>Current</Title>
      <WrapperTop>
        <CurrentWeather />
        <Chart hourlyPrecipitation={hourlyPrecipitation} />
      </WrapperTop>
      <WrapperBottom>
        <Forecast />
      </WrapperBottom>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  // border: 2px solid purple;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const WrapperTop = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: center;
  // flex-direction: row;
`;

const WrapperBottom = styled.div`
  border: 1px solid blue;
`;
