import React from "react";
import { WeatherData } from "../actions/weatherStation";

type WeatherItem = WeatherData["list"][0];

interface DetailedInfoProps {
  data: WeatherItem[];
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ data }) => {
  const getHour = (time: number): number => new Date(time * 1000).getHours();
  const getDate = (date: number): number => new Date(date * 1000).getDate();

  const displayMoreInfo = (item: WeatherItem, i: number): JSX.Element => {
    return (
      <div className="hourly-info" key={i}>
        <div className="hour-temperature">
          {`${Math.round(item.main.temp)}°C`}
        </div>
        <div className="hour-of-the-day">{`${getHour(item.dt)}:00`}</div>
      </div>
    );
  };

  return (
    <div className="hourly">
      {data.map((item, i) =>
        getHour(item.dt) > getHour(Date.now() / 1000) &&
        getDate(item.dt) === getDate(Date.now() / 1000)
          ? displayMoreInfo(item, i)
          : getHour(item.dt) >= 5 && getHour(item.dt) <= 23
          ? displayMoreInfo(item, i)
          : null
      )}
    </div>
  );
};

export default DetailedInfo;
