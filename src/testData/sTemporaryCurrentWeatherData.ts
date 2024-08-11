// data exported from https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${units} endpoint to avoid hitting rate limit

export const temporaryCurrentWeatherData = {
  coord: {
    lon: -73.9558,
    lat: 40.7691,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 92.23,
    feels_like: 100.76,
    temp_min: 83.93,
    temp_max: 97.95,
    pressure: 1016,
    humidity: 53,
  },
  visibility: 10000,
  wind: {
    speed: 10.36,
    deg: 90,
  },
  clouds: {
    all: 0,
  },
  dt: 1719077207,
  sys: {
    type: 2,
    id: 2013635,
    country: "US",
    sunrise: 1719048296,
    sunset: 1719102651,
  },
  timezone: -14400,
  id: 7250946,
  name: "Carnegie Hill",
  cod: 200,
};
