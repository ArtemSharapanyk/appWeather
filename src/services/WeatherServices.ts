/* eslint-disable no-param-reassign */
import { $getWeatherInfoHandler } from "../api/weather/weather";
import CityWithWeather from "../components/models/CityWithWeather";
import { CityBaseInterface, CityWithWeatherInterface } from "../interfaces";
import { GetWeatherInfoResponseInterface } from "../interfaces/api";

export default class WeatherService {
  static createArrayOfRequests(cities: CityBaseInterface[]) {
    return cities.map((city) => {
      return $getWeatherInfoHandler(city.name);
    });
  }

  static prepareDataToStore(
    response: { data: GetWeatherInfoResponseInterface }[],
  ) {
    return response.map((cityInfo) => new CityWithWeather(cityInfo.data));
  }

  static findCityById(
    id: string,
    cities: CityWithWeatherInterface[],
  ): CityWithWeatherInterface {
    return cities.find((city) => city.id === id) as any;
  }

  static findCityByIdAndReplace(
    id: string,
    cities: CityWithWeatherInterface[],
    newCity: CityWithWeatherInterface,
  ) {
    const cityIndex = cities.findIndex((city) => city.id === id);
    cities[cityIndex] = newCity;
  }
}
