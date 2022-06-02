import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isCashedInStore } from "../../../helpers";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import {
  getAllCurrenciesThunk,
  getExchangeRatesThunk,
} from "../../../redux/asyncActions/currency";
import { currencySlice } from "../../../redux/slices/currency";
import { appRoutesLinks } from "../../../routes/routes";
import CurrencyService from "../../../services/CurrencyService";
import "./index.scss";

const { setBaseCurrency } = currencySlice.actions;

export default function SetBaseCurrency() {
  const [currencyValue, setCurrencyValue] = React.useState("none");
  const { availbleCurrenciesList } = useTypedSelector(
    (state) => state.currency,
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getAllCurrenciesHandler = () => dispatch(getAllCurrenciesThunk());

  const handleChange = (event: SelectChangeEvent) => {
    setCurrencyValue(event.target.value);
  };

  useEffect(() => {
    isCashedInStore(!!availbleCurrenciesList.length, getAllCurrenciesHandler);
  }, []);

  useEffect(() => {
    if (availbleCurrenciesList.length) {
      setCurrencyValue(
        CurrencyService.getBaseCurrency() || availbleCurrenciesList[0],
      );
    }
  }, [availbleCurrenciesList]);

  const saveBaseCurrency = () => {
    CurrencyService.saveBaseCurrency(currencyValue);
    dispatch(getExchangeRatesThunk());
    navigate(appRoutesLinks.EXCHANGE_RATE);
    dispatch(setBaseCurrency(currencyValue));
  };

  return (
    <div className="page base-currency-page">
      <FormControl variant="filled" className="base-currency-page__form">
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={currencyValue}
          onChange={handleChange}
          autoWidth
          label="baseCurrency"
          MenuProps={MenuProps}
        >
          {availbleCurrenciesList.map((currency) => (
            <MenuItem key={`${currency}_currency-all-child`} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className="button-contained base-currency-page__button"
        onClick={saveBaseCurrency}
        variant="contained"
      >
        Save base currency
      </Button>
    </div>
  );
}
