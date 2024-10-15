import React from "react";
import { WeatherData } from "../actions/weatherStation";
import ForecastTiles from "./ForecastTiles";
import Dashboard from "./Dashboard";

interface WeatherForecastProps {
  data: WeatherData;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ data }) => {
  const { city, list } = data;
  const { name } = city;

  return (
    <div className="weather-forecast-wrapper">
      <Dashboard city={name} />
      <ForecastTiles forecasts={list} />
    </div>
  );
};

export default WeatherForecast;
