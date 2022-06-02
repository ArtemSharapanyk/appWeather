import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { $convertCurrency } from "../../../api/currency";
import { useAppDispatch } from "../../../hooks/redux";
import { currencySlice } from "../../../redux/slices/currency";
import CurrencyService from "../../../services/CurrencyService";
import "./index.scss";

interface ExchangeResults {
  to: string;
  from: string;
  rate: string | undefined;
  amount: number;
}

export default function ConvertCurrency() {
  const [inputValue, setInputValue] = useState("");
  const [exchangeResults, setExchangeResults] = useState<ExchangeResults | "">(
    "",
  );
  const { setLoading } = currencySlice.actions;
  const dispatch = useAppDispatch();

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setLoadingHandler = () => (state: boolean) =>
    dispatch(setLoading(state));

  const convertCurrencyByClick = async () => {
    const convertationQuery =
      CurrencyService.prepareDataToConvertation(inputValue);

    if (convertationQuery) {
      const { amount, symbolsOfCurrencies } = convertationQuery;
      const exchangeResultsData = await $convertCurrency(
        symbolsOfCurrencies.fromCurrencyKey,
        symbolsOfCurrencies.toCurrencyKey,
        amount,
        setLoadingHandler(),
      );

      const exchangeResultsScheme = {
        from: convertationQuery.symbolsOfCurrencies.fromCurrencyKey,
        to: convertationQuery.symbolsOfCurrencies.toCurrencyKey,
        rate: exchangeResultsData?.rate || `${0}`,
        amount,
      };

      if (exchangeResultsData) setExchangeResults(exchangeResultsScheme);
    }
  };

  return (
    <div className="page convert-currency-page">
      <div className="convert-currency-page__wrapper">
        <h2>Convert currency</h2>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Write text"
          variant="outlined"
          placeholder="1 EUR in USD"
          value={inputValue}
          onChange={onChangeInputHandler}
        />
        <Button
          onClick={convertCurrencyByClick}
          className="button-contained"
          variant="contained"
        >
          Convert
        </Button>
        {exchangeResults ? (
          <Alert className="convert-currency-page__alert" severity="info">
            {`${exchangeResults.amount} ${exchangeResults.from} is ${exchangeResults.rate} in ${exchangeResults.to}`}
          </Alert>
        ) : null}
      </div>
    </div>
  );
}
