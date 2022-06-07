/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CityWithWeather from "../../components/models/CityWithWeather";
import { CityWithWeatherInterface } from "../../interfaces";
import WeatherService from "../../services/WeatherServices";
import {
  addCityThunk,
  getCityPageThunk,
  getWeatherInfoMultipleThunk,
  refershWeatherInfoThunk,
} from "../asyncActions/cities";

interface InitialState {
  isLoading: boolean;
  cities: CityWithWeatherInterface[];
  isCitiesExacts: boolean;
  cityPage: CityWithWeather | null;
}

const initialState: InitialState = {
  isLoading: false,
  cities: [],
  isCitiesExacts: false,
  cityPage: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<CityWithWeatherInterface[]>) {
      state.cities = action.payload;
      if (!state.isCitiesExacts) {
        state.isCitiesExacts = true;
      }
    },
    addCity(state, action: PayloadAction<CityWithWeatherInterface>) {
      state.cities.push(action.payload);
      if (!state.isCitiesExacts) {
        state.isCitiesExacts = true;
      }
    },
    setIsCitiesExacts(state) {
      state.isCitiesExacts = true;
    },
  },
  extraReducers: {
    [getWeatherInfoMultipleThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getWeatherInfoMultipleThunk.fulfilled.type]: (state, action) => {
      state.cities = action.payload;
      state.isLoading = false;
    },

    [addCityThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addCityThunk.fulfilled.type]: (
      state,
      action: PayloadAction<CityWithWeatherInterface>,
    ) => {
      state.cities.unshift(action.payload);
      state.isLoading = false;
    },

    [refershWeatherInfoThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [refershWeatherInfoThunk.fulfilled.type]: (
      state,
      action: PayloadAction<CityWithWeatherInterface>,
    ) => {
      WeatherService.findCityByIdAndReplace(
        action.payload.id,
        state.cities,
        action.payload,
      );
      state.isLoading = false;
    },

    [getCityPageThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCityPageThunk.fulfilled.type]: (
      state,
      action: PayloadAction<CityWithWeatherInterface>,
    ) => {
      state.cityPage = action.payload;
      state.isLoading = false;
    },
  },
});

export default citiesSlice.reducer;
