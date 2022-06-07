import { CityBaseInterface, CityWithWeatherInterface } from "../interfaces";

const CITIES_LIST_KEY = "cities";

export class CitiesService {
  static deleteCity(name: string, storedCities: CityWithWeatherInterface[]) {
    const citiesListFromLocalStorage = CitiesService.getCities();

    if (citiesListFromLocalStorage) {
      const filteredCitiesList = citiesListFromLocalStorage.filter(
        (city) => city.name !== name,
      );

      CitiesService.setCities(filteredCitiesList);
    }

    return storedCities.filter((city) => city.name !== name);
  }

  static addCity(city: CityBaseInterface): CityBaseInterface {
    const citiesList = CitiesService.getCities();

    if (citiesList) {
      citiesList.push(city);
      CitiesService.setCities(citiesList);

      return city;
    }

    CitiesService.setCities([city]);

    return city;
  }

  static getCities(): CityBaseInterface[] | null {
    const citiesList = localStorage.getItem(CITIES_LIST_KEY);

    if (citiesList) {
      return JSON.parse(citiesList);
    }

    return null;
  }

  static setCities(cities: CityBaseInterface[]) {
    localStorage.setItem(CITIES_LIST_KEY, JSON.stringify(cities));
  }

  static isCityInStorage(name: string) {
    const citiesFromStorage = CitiesService.getCities();

    if (citiesFromStorage) {
      const isCity = citiesFromStorage.find((city) => city.name === name);

      return isCity;
    }

    return false;
  }
}
