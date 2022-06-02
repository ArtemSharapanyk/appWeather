import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { isCashedInStore } from "../../../helpers";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { getExchangeRatesThunk } from "../../../redux/asyncActions/currency";
import "./index.scss";

export default function ExchangeRate() {
  const { exchangeRatesList } = useTypedSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const getExchangeRateHandler = () => dispatch(getExchangeRatesThunk());

  useEffect(() => {
    isCashedInStore(!!exchangeRatesList.length, getExchangeRateHandler);
  }, []);

  return (
    <div className="page exchange-rate-page">
      {exchangeRatesList.length ? (
        <>
          <div className="exchange-rate-page__header-wrapper">
            <Button variant="contained" onClick={getExchangeRateHandler}>
              Refresh
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Selected currency count</TableCell>
                  <TableCell>Currency Name</TableCell>
                  <TableCell>Currency count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exchangeRatesList.map((row) => (
                  <TableRow
                    key={`${row.name}${row.count}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
}
