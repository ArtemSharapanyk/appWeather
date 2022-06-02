import { Container } from "@mui/material";
import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { currencySlice } from "../../../redux/slices/currency";
import appRoutes, { appRoutesLinks } from "../../../routes/routes";
import CurrencyService from "../../../services/CurrencyService";
import Loader from "../../shared/Loader/Loader";

export default function AppRouter() {
  const { baseCurrency, isLoading } = useTypedSelector(
    (state) => state.currency,
  );

  const { setBaseCurrency } = currencySlice.actions;
  const baseCurrencyStored = CurrencyService.getBaseCurrency();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (baseCurrencyStored) {
      dispatch(setBaseCurrency(baseCurrencyStored));
    }
  }, []);

  return (
    <Container className="pages-wrapper">
      <Loader isLoading={isLoading} />
      <Suspense fallback={<Loader isLoading />}>
        {!baseCurrency ? (
          <Routes>
            {appRoutes.map((route) => {
              return route.closed ? null : (
                <Route
                  path={route.route}
                  key={`${route.name}_route`}
                  element={route.component}
                />
              );
            })}
            <Route
              path="*"
              element={
                <Navigate to={appRoutesLinks.SET_BASE_CURRENCY} replace />
              }
            />
          </Routes>
        ) : (
          <Routes>
            {appRoutes.map((route) => (
              <Route
                path={route.route}
                key={`${route.name}_route`}
                element={route.component}
              />
            ))}
            <Route
              path="*"
              element={<Navigate to={appRoutesLinks.EXCHANGE_RATE} replace />}
            />
          </Routes>
        )}
      </Suspense>
    </Container>
  );
}
