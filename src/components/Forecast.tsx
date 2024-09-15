import styled from "styled-components";
import { useForecastWeather } from "../hooks/useForecastWeather";
import { IWeeklyTransformedWeatherData } from "../interfaces/IWeeklyTransformedWeatherData";

const Forecast = () => {
  const dailyWeather = useForecastWeather().dailyWeather;

  console.log("forecast", dailyWeather);

  return (
    <WrapperColumns>
      <div>
        <WrapperForecast></WrapperForecast>
      </div>
      <div>
        <WrapperForecast>
          <Title>Forecast</Title>
          <WrapperRows>
            {dailyWeather &&
              dailyWeather.map((listItem: IWeeklyTransformedWeatherData) => {
                return (
                  <WeeklyWeatherCard>
                    {listItem.dt_txt}
                    {/* <SVG src="/cloud.svg"></SVG> */}
                    {listItem.weatherEvent === "Clouds" && (
                      <SVG src="/cloud.svg"></SVG>
                    )}
                    {listItem.weatherEvent === "Scattered Clouds" && (
                      <SVG src="/cloud.svg"></SVG>
                    )}
                    {listItem.weatherEvent === "Rain" && (
                      <SVG src="/rain.svg"></SVG>
                    )}
                    {listItem.weatherEvent === "Snow" && (
                      <SVG src="/snow.svg"></SVG>
                    )}
                    {listItem.weatherEvent === "Sun" && (
                      <SVG src="/sun.svg"></SVG>
                    )}
                    {listItem.weatherEvent === "Clear" && (
                      <SVG src="/sun.svg"></SVG>
                    )}
                    <HighAndLowTemp>
                      <div>
                        {Math.round((listItem.temp_max * 9) / 5 - 459.67)}{" "}
                      </div>
                      <div>
                        {Math.round((listItem.temp_min * 9) / 5 - 459.67)}{" "}
                      </div>
                    </HighAndLowTemp>
                  </WeeklyWeatherCard>
                );
              })}
          </WrapperRows>
        </WrapperForecast>
      </div>
    </WrapperColumns>
  );
};

export default Forecast;

const WrapperColumns = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperRows = styled.div`
  border-radius: 0.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  // background-color: #ffdbbb;
  // padding-top: 0.25em;
  // padding-bottom: 0.25em;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-around;
  font-size: 60px;
  font-weight: 600;
  // margin-top: 30px;
  // margin-bottom: 30px;
  text-align: center;
`;

const WrapperForecast = styled.div`
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

const WeeklyWeatherCard = styled.div`
  background-color: #2e233d;
  border: 5px solid #f1f1f8;
  box-shadow: 5px 5px #d28fff;
  border-radius: 0.5em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  font-weight: 600;
  font-family: "Rubik Variable", sans-serif;
`;

const SVG = styled.img`
  width: 100px;
`;

const HighAndLowTemp = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 50px;
  // border: 1px solid green;
  width: 100%;
  // margin: 0;
  // padding: 0;
`;
