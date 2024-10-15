import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData, WeatherData } from "../actions/weatherStation";

export interface WeatherState {
  data: WeatherData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: "idle",
  error: null
};

const weatherStationSlice = createSlice({
  name: "weatherStation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  }
});

export default weatherStationSlice.reducer;
