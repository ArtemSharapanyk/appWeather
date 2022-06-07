export interface GetWeatherInfoResponseInterface {
  base: string;
  clouds: {
    all: number;
  };
  id: number;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  name: string;
}
