import axios from "axios";

const API_LINK = "https://api.apilayer.com/fixer/";
const API_KEY = "1q8B9EGasgW4afEfwcZW1jpqlRVXXT1w";

export const endpoints = {
  convert: "convert",
  latestExchangeRates: "latest",
  allCurrency: "symbols",
};

const $api = axios.create({
  baseURL: API_LINK,
  headers: {
    apiKey: API_KEY,
  },
});

export default $api;
