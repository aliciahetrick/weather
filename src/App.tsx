import CurrentWeather from "./components/CurrentWeather";

import styled from "styled-components";

function App() {
  return (
    <>
      <Wrapper>
        <CurrentWeather />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: #efb61f;
  border: 1px solid red;
`;
