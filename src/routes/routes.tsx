import React, { ReactElement, lazy } from "react";

interface AppRoutesInterface {
  component: ReactElement;
  name: string;
  route: string;
  closed?: boolean;
}

const ConvertCurrency = lazy(
  () => import("../components/pages/ConvertCurrency/ConvertCurrency"),
);
const ExchangeRate = lazy(
  () => import("../components/pages/ExchangeRate/ExchangeRate"),
);
const SetBaseCurrency = lazy(
  () => import("../components/pages/SetBaseCurrency/SetBaseCurrency"),
);

export const appRoutesLinks = {
  EXCHANGE_RATE: "/exchange_rates",
  CONVERT_CURRENCY: "/convert_currency",
  SET_BASE_CURRENCY: "/set_base_currency",
};

const appRoutes: AppRoutesInterface[] = [
  {
    component: <ExchangeRate />,
    name: "Exchange rate",
    route: appRoutesLinks.EXCHANGE_RATE,
    closed: true,
  },
  {
    component: <ConvertCurrency />,
    name: "Conver currency",
    route: appRoutesLinks.CONVERT_CURRENCY,
    closed: true,
  },
  {
    component: <SetBaseCurrency />,
    name: "Set base currency",
    route: appRoutesLinks.SET_BASE_CURRENCY,
  },
];

export default appRoutes;
