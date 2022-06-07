/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { getCityPageThunk } from "../../../redux/asyncActions/cities";
import { citiesSlice } from "../../../redux/slices/cities";
import { appRoutesLinks } from "../../../routes/routes";
import { CitiesService } from "../../../services/CitiesServices";

const { setCities } = citiesSlice.actions;

const { Title } = Typography;

export function DetailCity() {
  const { name } = useParams();
  const dispacth = useAppDispatch();
  const { cityPage, cities } = useTypedSelector((state) => state.cities);
  const navigate = useNavigate();

  useEffect(() => {
    dispacth(getCityPageThunk(name as string));
  }, []);

  const getColums = () => {
    if (cityPage)
      return Object.keys(cityPage.weatherInfo).map((key) => ({
        title: key,
        dataIndex: key,
        key: `${key}__key`,
      }));
  };

  const getData = () => {
    if (cityPage) return [cityPage.weatherInfo];
  };

  const deletePage = () => {
    const arrayWithouDeletedCity = CitiesService.deleteCity(
      name as string,
      cities,
    );

    dispacth(setCities(arrayWithouDeletedCity));
    navigate(appRoutesLinks.ADD_CITY);
  };

  return (
    <div className="page-block details-city">
      <Title level={2}>Detail City</Title>
      {cityPage ? (
        <Table columns={getColums()} dataSource={getData() as any} />
      ) : null}
      <Button onClick={deletePage} danger>
        Delete City
      </Button>
    </div>
  );
}

export default DetailCity;
