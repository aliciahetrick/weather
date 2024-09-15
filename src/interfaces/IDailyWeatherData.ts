export interface IDailyWeatherData {
  weatherEvent: string;
  forEach(arg0: (entry: IDailyWeatherData) => void): unknown;
  weather: any[];
  pop: number;
  dt: number;
  main: { temp_max: number; temp_min: number };
  dt_txt: string;
}
