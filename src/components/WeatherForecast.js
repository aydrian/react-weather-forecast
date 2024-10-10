import React from "react";
import PropTypes from "prop-types";

import ForecastTiles from "./ForecastTiles";
import Dashboard from "./Dashboard";

const WeatherForecast = ({ data }) => {
  const { city, list } = data;
  const { name } = city;

  return (
    <div className="weather-forecast-wrapper">
      <Dashboard city={name} />
      <ForecastTiles forecasts={list} />
    </div>
  );
};

WeatherForecast.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    list: PropTypes.array.isRequired
  }).isRequired
};

export default WeatherForecast;
