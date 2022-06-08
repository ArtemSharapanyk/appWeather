import { $getWeatherInfo } from "../../../api/weather/weather";
import { mockValue } from "./mockValue";
import $api from "../../../api";
import CityWithWeather from "../../../components/models/CityWithWeather";

jest.mock("../../../api");

describe("getWeatherInfo", () => {
  test("is request return current value", async () => {
    const data = mockValue;
    const response = { data: data() };
    $api.get.mockResolvedValue(response);

    const dataFromServer = await $getWeatherInfo("London");
    expect($api.get).toBeCalled();
    expect(dataFromServer).toEqual(new CityWithWeather(data()));
  });
});
