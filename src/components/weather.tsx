require("dotenv").config();

const Weather = () => {
  const API_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  console.log("API_key", API_key);

  console.log("hi");

  return (
    <div>
      <h1>weather</h1>
    </div>
  );
};

export default Weather;
