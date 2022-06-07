import { Typography } from "antd";
import React from "react";
import { AddCityForm } from "./components/AddCityForm";
import "./AddCity.scss";

const { Title } = Typography;

export function AddCity() {
  return (
    <div className="page-block add-city-page">
      <Title level={2}>Add city</Title>
      <AddCityForm />
    </div>
  );
}

export default AddCity;
