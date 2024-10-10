import { createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID } from "../constants/generalConstants";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "weatherStation/fetchData",
  async (region, { rejectWithValue }) => {
    const { latitude, longitude } = region || {};

    const getDataByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${region}&units=metric&appid=${APP_ID}`;
    const getDataByCoords = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`;

    const location =
      typeof region === "object" ? getDataByCoords : getDataByCity;

    try {
      const response = await axios.get(location);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
