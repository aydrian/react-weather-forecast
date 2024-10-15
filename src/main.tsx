import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";
import "./styles/main.scss";

const container: HTMLElement | null = document.getElementById("root");

if (container === null) {
  throw new Error("Root element not found");
}

const root: Root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
