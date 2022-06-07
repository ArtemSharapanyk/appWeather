import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { getWeatherInfoMultipleThunk } from "../../../redux/asyncActions/cities";
import { CityCard } from "./components/CityCard/CityCard";
import "./CitiesList.scss";

export function CitiesList() {
  const dispatch = useAppDispatch();
  const { cities } = useTypedSelector((state) => state.cities);
  const navigate = useNavigate();

  const goToCityPage = (name: string) => () => {
    navigate(`/cities/${name}`);
  };

  useEffect(() => {
    dispatch(getWeatherInfoMultipleThunk());
  }, []);

  return (
    <div className="page-block page-cities-list">
      {cities.map((city) => (
        <CityCard
          id={city.id}
          key={`${city.id + city.name}__id`}
          name={city.name}
          description={city.weatherInfo.description}
          temp={city.weatherInfo.temp}
          ico={city.weatherInfo.icon}
          goToPage={goToCityPage(city.name)}
        />
      ))}
      <Outlet />
    </div>
  );
}

export default CitiesList;
