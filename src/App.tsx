import CurrentWeather from "./components/Today";
import styled from "styled-components";

import "./App.css";
import Forecast from "./components/Forecast";

function App() {
  return (
    <Wrapper>
      <WrapperTop>
        <CurrentWeather />
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

const WrapperTop = styled.div`
  // border: 1px solid blue;
`;

const WrapperBottom = styled.div`
  // border: 1px solid blue;
`;
