import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Dashboard from "../../components/Dashboard";

const mockStore = configureStore();
const STATUS = "success";

describe("<Dashboard />", () => {
  const store = mockStore({ weatherStation: { status: STATUS } });

  const renderDashboard = (props = {}) => {
    return render(
      <Provider store={store}>
        <Dashboard {...props} />
      </Provider>
    );
  };

  it("renders the weather dashboard", () => {
    renderDashboard();
    expect(screen.getByTestId("weather-dashboard")).toBeInTheDocument();
  });

  it("should contain an input field", () => {
    renderDashboard();
    expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
  });

  it("should contain a change city button", () => {
    renderDashboard();
    expect(
      screen.getByRole("button", { name: /change city/i })
    ).toBeInTheDocument();
  });

  it("should contain app heading", () => {
    renderDashboard();
    expect(
      screen.getByRole("heading", { name: "5-Day Weather Forecast" })
    ).toBeInTheDocument();
  });

  it("should receive city prop", () => {
    renderDashboard({ city: "london" });
    // Since we can't directly check props with RTL, we need to verify the effect of the prop
    // This might involve checking if 'london' appears in the rendered output
    expect(screen.getByText(/london/i)).toBeInTheDocument();
  });
});
