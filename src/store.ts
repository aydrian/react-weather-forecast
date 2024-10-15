import { configureStore, Middleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const middleware: Middleware[] = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
