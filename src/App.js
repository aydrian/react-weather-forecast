import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions/weatherStation";
import WeatherForecast from "./components/WeatherForecast";

const App = () => {
  const dispatch = useDispatch();
  const forecast = useSelector((state) => state.weatherStation.data);

  useEffect(() => {
    const detectLocation = new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("Error detecting location: Permission denied");
            } else {
              console.error("Error detecting location:", error.message);
            }
            reject(error);
          }
        );
      } else {
        console.error("Geolocation not supported");
        reject(new Error("Geolocation not supported"));
      }
    });

    detectLocation
      .then((location) => {
        dispatch(fetchData(location));
      })
      .catch(() => {
        console.log("Using default location: London");
        dispatch(fetchData("london"));
      });
  }, [dispatch]);

  if (forecast === null) {
    return (
      <div className="loading">
        <div className="spinner">Loading</div>
      </div>
    );
  }

  return (
    <div>
      <WeatherForecast data={forecast} />
      <div className="fork">
        <a
          href="https://github.com/Gigacore/react-weather-forecast"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fork it on Github
        </a>
      </div>
    </div>
  );
};

export default App;
