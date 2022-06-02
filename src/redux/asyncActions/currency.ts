import { createAsyncThunk } from "@reduxjs/toolkit";
import { $getAllCurrencies, $getExchangeRates } from "../../api/currency";
import CurrencyService from "../../services/CurrencyService";
// import CurrencyModel from "../../models/CurrencyModel";

export const getExchangeRatesThunk = createAsyncThunk(
  "currency/getExchangeRates",
  async () => {
    const response = await $getExchangeRates();

    if (response) {
      const changedArrayWithCurrenciesInfo = Object.keys(response).map(
        (currency) => {
          return {
            name: currency,
            count: response[currency],
          };
        },
      );

      return changedArrayWithCurrenciesInfo;
    }

    return [];
  },
);

export const getAllCurrenciesThunk = createAsyncThunk(
  "currency/getAllCurrencies",
  async () => {
    const storedCurrencies = CurrencyService.getAllAvaibleCurrencies();

    if (storedCurrencies) return storedCurrencies;
    const response = await $getAllCurrencies();

    if (response) {
      const arrayOfCurrenciesSymbols = Object.keys(response);
      CurrencyService.setAllAvaibleCurrencies(arrayOfCurrenciesSymbols);

      return arrayOfCurrenciesSymbols;
    }

    return [];
  },
);

export default { getExchangeRatesThunk };
