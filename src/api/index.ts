import axios from "axios";

const API_LINK = "https://api.openweathermap.org/data/2.5/";
export const API_KEY = "8881f58760ac61bf022239ef6be06efa";

export const endpoints = {
  weather: "weather",
};

const $api = axios.create({
  baseURL: API_LINK,
});

export default $api;
