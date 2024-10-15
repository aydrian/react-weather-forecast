import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, WeatherData } from "./actions/weatherStation";
import WeatherForecast from "./components/WeatherForecast";
import { AppDispatch, RootState } from "./store"; // Assuming you have these types defined

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forecast = useSelector((state: RootState) => state.weatherStation.data);

  useEffect(() => {
    const detectLocation = new Promise<GeolocationCoordinates>(
      (resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position.coords);
            },
            (error: GeolocationPositionError) => {
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
      }
    );

    detectLocation
      .then((location) => {
        dispatch(
          fetchData({
            latitude: location.latitude,
            longitude: location.longitude
          })
        );
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
