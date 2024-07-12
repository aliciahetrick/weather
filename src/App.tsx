import CurrentWeather from "./components/Today";
import styled from "styled-components";

import "./App.css";
import ForecastTemp from "./components/ForecastTemp";

function App() {
  return (
    <>
      <CurrentWeather />
      <WrapperBottom>
        <ForecastTemp />
      </WrapperBottom>
    </>
  );
}

export default App;

const WrapperBottom = styled.div`
  border: 1px solid blue;
`;
