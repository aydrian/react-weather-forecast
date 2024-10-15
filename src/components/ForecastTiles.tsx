import React, { useState, useCallback } from "react";
import DetailedInfo from "./DetailedInfo";
import { WeatherData } from "../actions/weatherStation";

type ForecastItem = WeatherData["list"][0];

interface ForecastTilesProps {
  forecasts: ForecastItem[];
}

const ForecastTiles: React.FC<ForecastTilesProps> = ({ forecasts }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  const groupByDays = useCallback(
    (data: ForecastItem[]): { [key: string]: ForecastItem[] } => {
      return data.reduce(
        (list: { [key: string]: ForecastItem[] }, item: ForecastItem) => {
          const forecastDate = new Date(item.dt * 1000)
            .toISOString()
            .split("T")[0];
          list[forecastDate] = list[forecastDate] || [];
          list[forecastDate].push(item);
          return list;
        },
        {}
      );
    },
    []
  );

  // Returns week of the day
  const getDayInfo = useCallback((data: ForecastItem[]): string => {
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
    (data: ForecastItem[]): string =>
      `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`,
    []
  );

  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  const getInfo = useCallback((data: ForecastItem[]): JSX.Element => {
    const temps = data.map((item) => item.main.temp);
    const humidities = data.map((item) => item.main.humidity);

    const minMax = {
      min: Math.round(Math.min(...temps)),
      max: Math.round(Math.max(...temps))
    };

    // Gets the day's average humidity
    const avgHumidity = Math.round(
      humidities.reduce((curr, next) => curr + next) / humidities.length
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
  const showMoreInfo = useCallback((index: number) => {
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

export default ForecastTiles;
