import { $getWeatherInfoHandler } from "../../../api/weather/weather";
import WeatherServices from "../../../services/WeatherServices";

describe("createArrayOfRequest is worked", () => {
  test("is return array with requests", () => {
    const mockValue = [
      {
        name: "London",
      },
      {
        name: "Kiev",
      },
    ];

    expect(WeatherServices.createArrayOfRequests(mockValue as any)).toEqual([
      $getWeatherInfoHandler("London"),
      $getWeatherInfoHandler("Kiev"),
    ]);
  });
});

describe("findByIdAndReplace is worked", () => {
  test("is replace old city to new", () => {
    const mockValue = [
      {
        name: "London",
        id: "1",
      },
      {
        name: "Kiev",
        id: "2",
      },
    ];

    WeatherServices.findCityByIdAndReplace(
      "1",
      mockValue as any,
      {
        name: "Madrid",
        id: "1",
      } as any,
    );

    expect(mockValue).toEqual([
      {
        name: "Madrid",
        id: "1",
      },
      {
        name: "Kiev",
        id: "2",
      },
    ]);
  });
});
