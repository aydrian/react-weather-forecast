import { createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID } from "../constants/generalConstants";
import axios from "axios";

interface Coordinates {
  latitude: number;
  longitude: number;
}

type Region = string | Coordinates;

export interface WeatherData {
  // Define the structure of your weather data here
  // This is just an example, adjust according to the actual API response
  city: {
    name: string;
    country: string;
  };
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

export const fetchData = createAsyncThunk<
  WeatherData,
  Region,
  { rejectValue: string }
>("weatherStation/fetchData", async (region, { rejectWithValue }) => {
  const isCoordinates = (region: Region): region is Coordinates =>
    typeof region === "object" && "latitude" in region && "longitude" in region;

  const { latitude, longitude } = isCoordinates(region)
    ? region
    : { latitude: null, longitude: null };

  const getDataByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${region}&units=metric&appid=${APP_ID}`;
  const getDataByCoords = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`;

  const location = isCoordinates(region) ? getDataByCoords : getDataByCity;

  try {
    const response = await axios.get<WeatherData>(location);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
