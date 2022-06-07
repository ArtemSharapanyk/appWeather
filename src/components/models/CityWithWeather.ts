import { GetWeatherInfoResponseInterface } from "../../interfaces/api";

export default class CityWithWeather {
  name: string;

  id: string;

  weatherInfo: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    description: string;
    icon: string;
  };

  constructor(obj: GetWeatherInfoResponseInterface) {
    this.name = obj.name;

    this.id = obj.id.toFixed();

    this.weatherInfo = {
      ...obj.main,
      description: obj.weather[0].description,
      icon: obj.weather[0].icon,
    };
  }
}
