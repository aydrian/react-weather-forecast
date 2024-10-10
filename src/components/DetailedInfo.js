import React from "react";
import PropTypes from "prop-types";

const DetailedInfo = ({ data }) => {
  const getHour = (time) =>
    time ? new Date(time).getHours() : new Date().getHours();
  const getDate = (date) =>
    date ? new Date(date).getDate() : new Date().getDate();

  const displayMoreInfo = (item, i) => {
    return (
      <div className="hourly-info" key={i}>
        <div className="hour-temperature">
          {`${Math.round(item.main.temp)}°C`}
        </div>
        <div className="hour-of-the-day">{`${getHour(item.dt * 1000)}:00`}</div>
      </div>
    );
  };

  return (
    <div className="hourly">
      {data.map((item, i) =>
        getHour(item.dt * 1000) > getHour() &&
        getDate(item.dt * 1000) === getDate()
          ? displayMoreInfo(item, i)
          : getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23
          ? displayMoreInfo(item, i)
          : null
      )}
    </div>
  );
};

DetailedInfo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default DetailedInfo;
