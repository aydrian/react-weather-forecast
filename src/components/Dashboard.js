import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { fetchData } from "../actions/weatherStation";

const Dashboard = ({ city }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.weatherStation.status);
  const cityInputRef = useRef(null);

  const updateCity = () => {
    const cityValue = cityInputRef.current.value;
    if (cityValue.length !== 0) {
      dispatch(fetchData(cityValue));
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateCity();
    }
  };

  const wrapperClass =
    status === "failed"
      ? "weather-dashboard invalid-city"
      : "weather-dashboard";

  return (
    <div className={wrapperClass}>
      <header>
        <h1 className="heading">5-Day Weather Forecast</h1>
      </header>
      <section className="controls">
        <div>
          <input
            type="text"
            className="city-input"
            id="city-name"
            ref={cityInputRef}
            onKeyPress={onKeyPress}
            placeholder={city}
          />
          <input
            type="button"
            value=">"
            className="search"
            onClick={updateCity}
            id="change-city-btn"
          />
        </div>
      </section>
      <span className="error">Please enter valid city name!</span>
    </div>
  );
};

Dashboard.propTypes = {
  city: PropTypes.string.isRequired
};

export default Dashboard;
