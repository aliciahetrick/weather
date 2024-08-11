export interface IDailyWeatherData {
  weather: any[];
  pop: number;
  dt: number;
  main: { temp_max: number; temp_min: number };
}
