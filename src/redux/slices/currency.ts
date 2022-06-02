/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCurrenciesThunk,
  getExchangeRatesThunk,
} from "../asyncActions/currency";

interface CurrencyInterface {
  name: string;
  count: number;
}

interface CurrencyStateInterface {
  baseCurrency: null | string;
  isLoading: boolean;
  exchangeRatesList: CurrencyInterface[];
  availbleCurrenciesList: string[];
}

const initialState: CurrencyStateInterface = {
  baseCurrency: null,
  isLoading: false,
  exchangeRatesList: [],
  availbleCurrenciesList: [],
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setBaseCurrency(state, action: PayloadAction<string>) {
      state.baseCurrency = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getExchangeRatesThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getExchangeRatesThunk.fulfilled.type]: (
      state,
      action: PayloadAction<CurrencyInterface[]>,
    ) => {
      state.isLoading = false;
      state.exchangeRatesList = action.payload;
    },

    [getAllCurrenciesThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllCurrenciesThunk.fulfilled.type]: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.availbleCurrenciesList = action.payload;
      state.isLoading = false;
    },
    [getAllCurrenciesThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default currencySlice.reducer;
