/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from "@hookform/error-message";
import { Button, Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { $getWeatherInfo } from "../../../../api/weather/weather";
import { showPopup } from "../../../../helpers/ui/popup";
import { useAppDispatch, useTypedSelector } from "../../../../hooks/redux";
import { addCityThunk } from "../../../../redux/asyncActions/cities";
import { citiesSlice } from "../../../../redux/slices/cities";
import { CitiesService } from "../../../../services/CitiesServices";
import { ErrorMessage as ErrorMessegeCustom } from "../../../errors/validation/ErrorMessage";

interface CityFormData {
  city: string;
}

const { setIsCitiesExacts } = citiesSlice.actions;

export function AddCityForm() {
  const { control, handleSubmit, reset } = useForm<CityFormData>({
    mode: "onBlur",
  });
  const { isCitiesExacts } = useTypedSelector((state) => state.cities);

  const dispatch = useAppDispatch();

  const onSumbit = async (data: CityFormData) => {
    const isCityBeInStorage = CitiesService.isCityInStorage(data.city);

    if (isCityBeInStorage) {
      showPopup("City now is in the list!");
      reset();
      return;
    }

    const isCityNameTrue = await $getWeatherInfo(data.city);

    if (!isCityNameTrue) {
      showPopup("Name of city, not correct");
      reset();
      return;
    }

    const citySheme = {
      key: `${data.city}__city`,
      name: data.city,
    };

    const city = CitiesService.addCity(citySheme);

    if (!isCitiesExacts) dispatch(setIsCitiesExacts());

    dispatch(addCityThunk(city.name));
    showPopup("City have been added", "info");
    reset();
  };

  return (
    <form className="add-city-form" onSubmit={handleSubmit(onSumbit)}>
      <Controller
        control={control}
        name="city"
        defaultValue=""
        rules={{
          required: "Field is empty",
          minLength: {
            message: "Field should be more then 3",
            value: 3,
          },
        }}
        render={({ field, formState: { errors } }) => (
          <>
            <div className="controll-block">
              <Input {...field} placeholder="City" />
              <Button htmlType="submit" type="primary">
                Add
              </Button>
            </div>
            <ErrorMessage errors={errors} as={ErrorMessegeCustom} name="city" />
          </>
        )}
      />
    </form>
  );
}
