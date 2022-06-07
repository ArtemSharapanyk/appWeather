export interface CityBaseInterface {
  name: string;
  key: string;
}

export interface CityWithWeatherInterface {
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
}
