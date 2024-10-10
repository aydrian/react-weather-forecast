import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherForecast from "../../components/WeatherForecast";
import data from "./data/forecast.json";

describe("<WeatherForecast />", () => {
  it("should render a div with `.weather-forecast-wrapper` class", () => {
    render(<WeatherForecast data={data.weatherStation.data} />);
    const forecastWrapper = screen.getByTestId("weather-forecast-wrapper");
    expect(forecastWrapper).toHaveClass("weather-forecast-wrapper");
  });

  it("should contain a dashboard", () => {
    render(<WeatherForecast data={data.weatherStation.data} />);
    const dashboard = screen.getByTestId("dashboard");
    expect(dashboard).toBeInTheDocument();
  });
});
