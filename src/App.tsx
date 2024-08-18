import styled from "styled-components";

import "./App.css";
import Forecast from "./components/Forecast";

import Chart from "./components/Chart";
import { useForecastWeather } from "./hooks/useForecastWeather";
import { useCurrentWeather } from "./hooks/useCurrentWeather";
import Temperature from "./components/Temperature";
import Times from "./components/Times";

import "@fontsource-variable/rubik";

function App() {
  const hourlyPrecipitation = useForecastWeather().hourlyPrecipitation;
  const weather = useCurrentWeather();
  return (
    <Wrapper>
      <WrapperTop>
        <Title>Current</Title>
        <CurrentContainerWrapper>
          <Temperature weather={weather} />
          <Times weather={weather} />
          <Chart hourlyPrecipitation={hourlyPrecipitation} />
        </CurrentContainerWrapper>
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
  gap: 20px;
  margin-top: 20px;
`;

const WrapperTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
  text-transform: uppercase;
`;

const CurrentContainerWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-left: 3em;
  margin-right: 3em;
  gap: 20px;
`;

const WrapperBottom = styled.div``;
