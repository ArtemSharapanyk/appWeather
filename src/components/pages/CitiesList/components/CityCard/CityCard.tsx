/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { FC, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../../../../hooks/redux";
import { refershWeatherInfoThunk } from "../../../../../redux/asyncActions/cities";
import WeatherService from "../../../../../services/WeatherServices";
import "./CityCard.scss";

interface Props {
  ico: string;
  name: string;
  description: string;
  temp: number;
  id: string;
  goToPage: () => void;
}

export const CityCard: FC<Props> = ({
  ico,
  name,
  description,
  temp,
  id,
  goToPage,
}) => {
  const tempInC = (((temp - 32) * 5) / 9).toFixed(0);
  const tempInF = temp.toFixed(0);
  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const { cities } = useTypedSelector((state) => state.cities);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const refreshWeather = () => {
    const { name: nameCity } = WeatherService.findCityById(id, cities);
    dispatch(refershWeatherInfoThunk(nameCity));
  };

  return (
    <div
      className="box city-card"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="wave -one" />
      <div className="wave -two" />
      <div className="wave -three" />
      <div className="weathercon">
        <img
          src={`http://openweathermap.org/img/wn/${ico}@2x.png`}
          alt="ico"
          className="fas fa-sun"
        />
      </div>
      <div className="info">
        <h2 className="location">{name}</h2>
        <p className="date">{description}</p>
        <h1 className="temp">
          {tempInC} &deg;C | {tempInF} &deg;F
        </h1>
      </div>
      {isHovered ? (
        <div className="controls">
          <div className="more-btn" onClick={goToPage}>
            Details
          </div>
          <div className="refresh-btn" onClick={refreshWeather}>
            Refresh
          </div>
        </div>
      ) : null}
    </div>
  );
};
