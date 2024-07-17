import CurrentWeather from "./components/Today";
import styled from "styled-components";

import "./App.css";
import Forecast from "./components/Forecast";

function App() {
  return (
    <>
      <CurrentWeather />
      <WrapperBottom>
        <Forecast />
      </WrapperBottom>
    </>
  );
}

export default App;

const WrapperBottom = styled.div`
  // border: 1px solid blue;
`;
