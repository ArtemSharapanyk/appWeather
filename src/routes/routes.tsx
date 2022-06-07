import React, { lazy } from "react";
import { AppRoutesInterface } from "../interfaces/routes";

const AddCity = lazy(() => import("../components/pages/AddCity/AddCity"));

const CitiesList = lazy(
  () => import("../components/pages/CitiesList/CitiesList"),
);
const DetailCity = lazy(
  () => import("../components/pages/DetailCity/DetailCity"),
);

export const appRoutesLinks = {
  ADD_CITY: "/add_city",
  CITIES_LIST: "/cities_list",
  DETAIL_CITY: "/cities/:name",
};

const appRoutes: AppRoutesInterface[] = [
  {
    component: <AddCity />,
    name: "Add city",
    route: appRoutesLinks.ADD_CITY,
    closed: false,
    isInNavigation: true,
  },
  {
    component: <CitiesList />,
    name: "Weather info by your prefered list of cities",
    route: appRoutesLinks.CITIES_LIST,
    closed: true,
    isInNavigation: true,
  },
  {
    component: <DetailCity />,
    name: "Detail info",
    route: appRoutesLinks.DETAIL_CITY,
    closed: true,
    isInNavigation: false,
  },
];

export const privateRoutes = appRoutes.filter((route) => route.closed);
export const publicRoutes = appRoutes.filter((route) => !route.closed);

export default appRoutes;
