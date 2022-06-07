import axios from "axios";
import $api, { API_KEY, endpoints } from "..";
import CityWithWeather from "../../components/models/CityWithWeather";
import { showPopup } from "../../helpers/ui/popup";
import { GetWeatherInfoResponseInterface } from "../../interfaces/api";

export const $getWeatherInfo = async (name: string) => {
  try {
    const data = await $api
      .get<GetWeatherInfoResponseInterface>(endpoints.weather, {
        params: {
          q: name,
          appid: API_KEY,
        },
      })
      .catch((e) => {
        throw e;
      });

    return new CityWithWeather(data.data);
  } catch (e: any) {
    showPopup(e.message);
    return null;
  }
};

export const $getWeatherInfoHandler = (name: string) => {
  return $api
    .get<GetWeatherInfoResponseInterface>(endpoints.weather, {
      params: {
        q: name,
        appid: API_KEY,
      },
    })
    .catch((e) => {
      throw e;
    });
};

export const $getWeathersInfoMultiple = async (
  requestsArray: any,
): Promise<GetWeatherInfoResponseInterface[]> => {
  const data = await axios.all(requestsArray);
  return data as any;
};
