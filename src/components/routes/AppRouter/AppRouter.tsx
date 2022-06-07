import { Layout } from "antd";
import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { mapRoutes } from "../../../helpers/routes";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { citiesSlice } from "../../../redux/slices/cities";
import appRoutes, {
  appRoutesLinks,
  publicRoutes,
} from "../../../routes/routes";
import { CitiesService } from "../../../services/CitiesServices";
import { Loader } from "../../shared/Loader/Loader";
// import { CitiesService } from "../../../services/CitiesServices";

const { Content } = Layout;

const { setIsCitiesExacts } = citiesSlice.actions;

export function AppRouter() {
  const dispatch = useAppDispatch();
  const { isCitiesExacts, isLoading } = useTypedSelector(
    (state) => state.cities,
  );

  useEffect(() => {
    const cashedCities = CitiesService.getCities();

    if (cashedCities) {
      dispatch(setIsCitiesExacts());
    }
  }, []);

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Loader isLoading={isLoading} />
      <Suspense fallback={<Loader isLoading />}>
        {isCitiesExacts ? (
          <Routes>
            {mapRoutes(appRoutes)}
            <Route
              path="*"
              element={<Navigate to={appRoutesLinks.CITIES_LIST} />}
            />
          </Routes>
        ) : (
          <Routes>
            {mapRoutes(publicRoutes)}
            <Route
              path="*"
              element={<Navigate to={appRoutesLinks.ADD_CITY} />}
            />
          </Routes>
        )}
      </Suspense>
    </Content>
  );
}
