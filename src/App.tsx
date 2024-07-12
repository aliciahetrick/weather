import CurrentWeather from "./components/Current";
import styled from "styled-components";

import "./App.css";
import Weekly from "./components/ForecastTemp";

function App() {
  return (
    <>
      <CurrentWeather />
      <WrapperBottom>
        <Weekly />
      </WrapperBottom>
    </>
  );
}

export default App;

const WrapperBottom = styled.div`
  border: 1px solid blue;
`;
