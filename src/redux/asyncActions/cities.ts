import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  $getWeatherInfo,
  $getWeathersInfoMultiple,
} from "../../api/weather/weather";
import WeatherService from "../../services/WeatherServices";
import { CitiesService } from "../../services/CitiesServices";

export const getWeatherInfoMultipleThunk = createAsyncThunk(
  "cities/getWeatherInfoMultiple",
  async () => {
    const cities = CitiesService.getCities();

    const response = await $getWeathersInfoMultiple(
      WeatherService.createArrayOfRequests(cities as any),
    );

    console.log(response);

    if (response) {
      return WeatherService.prepareDataToStore(response as any);
    }

    return [];
  },
);

export const addCityThunk = createAsyncThunk(
  "cities/addCity",
  async (name: string) => {
    const response = await $getWeatherInfo(name);
    return response;
  },
);

export const refershWeatherInfoThunk = createAsyncThunk(
  "cities/refreshWeatherInfo",
  async (name: string) => {
    const response = await $getWeatherInfo(name);
    return response;
  },
);

export const getCityPageThunk = createAsyncThunk(
  "cities/getCityPage",
  async (name: string) => {
    const response = await $getWeatherInfo(name);
    return response;
  },
);
