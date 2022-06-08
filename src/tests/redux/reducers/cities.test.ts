/* eslint-disable jest/valid-expect */
import citiesReducer, { citiesSlice } from "../../../redux/slices/cities";

const { setCities, addCity, setIsCitiesExacts } = citiesSlice.actions;

describe("cities reducer", () => {
  test("setCities", () => {
    const cities = [{ name: "Kiev" }];
    expect(
      citiesReducer({ cities: [] } as any, setCities(cities as any)),
    ).toEqual({ cities, isCitiesExacts: true });
  });

  test("addCity", () => {
    const city = { name: "Kiev" };
    expect(citiesReducer({ cities: [] } as any, addCity(city as any))).toEqual({
      cities: [city],
      isCitiesExacts: true,
    });
  });

  test("setIsCitiesExacts", () => {
    expect(
      citiesReducer({ isCitiesExacts: false } as any, setIsCitiesExacts()),
    ).toEqual({
      isCitiesExacts: true,
    });
  });
});
