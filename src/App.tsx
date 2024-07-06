import CurrentWeather from "./components/CurrentWeather";
import styled from "styled-components";

import "./App.css";
import Weekly from "./components/Weekly";

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
