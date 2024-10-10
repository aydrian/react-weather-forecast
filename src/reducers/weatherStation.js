import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../actions/weatherStation";

const weatherStationSlice = createSlice({
  name: "weatherStation",
  initialState: {
    data: null,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default weatherStationSlice.reducer;
