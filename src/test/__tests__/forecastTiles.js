import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import data from "./data/forecast.json";
const { list } = data.weatherStation.data;

import ForecastTiles from "../../components/ForecastTiles";

const mockStore = configureStore();

describe("<ForecastTiles />", () => {
  it("should render a forecast-tiles container div", () => {
    render(
      <Provider store={mockStore()}>
        <ForecastTiles forecasts={list} />
      </Provider>
    );
    const forecastTilesElement = screen.getByTestId("forecast-tiles");
    expect(forecastTilesElement).toBeInTheDocument();
    expect(forecastTilesElement).toHaveClass("forecast-tiles");
  });

  it("should render five forecast tiles", () => {
    render(
      <Provider store={mockStore()}>
        <ForecastTiles forecasts={list} />
      </Provider>
    );
    const forecastTiles = screen.getAllByTestId("forecast-tile");
    expect(forecastTiles).toHaveLength(5);
  });
});
