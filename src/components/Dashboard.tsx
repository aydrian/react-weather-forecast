import React, { useRef, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../actions/weatherStation";
import { RootState, AppDispatch } from "../store";

interface DashboardProps {
  city: string;
}

const Dashboard: React.FC<DashboardProps> = ({ city }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.weatherStation.status);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const updateCity = () => {
    const cityValue = cityInputRef.current?.value;
    if (cityValue && cityValue.length !== 0) {
      dispatch(fetchData(cityValue));
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
            onKeyDown={onKeyDown}
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

export default Dashboard;
