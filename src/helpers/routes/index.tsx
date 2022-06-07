import React from "react";
import { Route } from "react-router-dom";
import { AppRoutesInterface } from "../../interfaces/routes";

export const mapRoutes = (routes: AppRoutesInterface[]) => {
  return routes.map((route) => {
    return route.nested?.length ? (
      <Route path={route.route} element={route.component} key={route.route}>
        {mapRoutes(route.nested)}
      </Route>
    ) : (
      <Route path={route.route} element={route.component} key={route.route} />
    );
  });
};
