import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import DetailedInfo from "./DetailedInfo";

const ForecastTiles = ({ forecasts }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  const groupByDays = useCallback((data) => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {});
  }, []);

  // Returns week of the day
  const getDayInfo = useCallback((data) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  }, []);

  // Fetches the icon using the icon code available in the forecast data.
  const getIcon = useCallback(
    (data) => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`,
    []
  );

  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  const getInfo = useCallback((data) => {
    const min = [],
      max = [],
      humidity = [];
    data.forEach((item) => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max))
    };

    // Gets the day's average humidity
    const avgHumidity = Math.round(
      humidity.reduce((curr, next) => curr + next) / humidity.length
    );

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div className="more-info">{`Avg. Humidity: ${avgHumidity}%`}</div>
      </div>
    );
  }, []);

  // Toggles accordion to display hourly weather information
  const showMoreInfo = useCallback((index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const tiles = Object.values(groupByDays(forecasts));

  // Edge case:
  // When the webservice returns data for 6 calendar days during evenings as a result of offset,
  // this ensures that we are showing only 5-days of forecast.
  const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

  return (
    <div className="forecast-tiles">
      {forecastTiles.map((item, i) => (
        <div
          className={`forecast-tile tile-${i} ${
            expandedIndex === i ? "expanded" : ""
          }`}
          key={i}
          onClick={() => showMoreInfo(i)}
        >
          <div className="primary-info">
            <div className="icon">
              <img src={getIcon(item)} alt="weather icon" />
              {getDayInfo(item)}
            </div>
            {getInfo(item)}
          </div>
          <div className="detailed-info">
            <DetailedInfo data={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

ForecastTiles.propTypes = {
  forecasts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ForecastTiles;
