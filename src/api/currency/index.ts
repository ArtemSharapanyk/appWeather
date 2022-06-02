import $api, { endpoints } from "..";
import { showPopup } from "../../helpers/ui/popup";
import CurrencyService from "../../services/CurrencyService";

interface AllCurrenciesResponse {
  symbols: { [key: string]: string };
}

interface ExchangeRatesResponse {
  rates: { [key: string]: number };
}

interface ConvertCurrencyResponseInfo {
  rate: string;
}

interface ConvertCurrencyResponse {
  info: ConvertCurrencyResponseInfo;
}

export const $getAllCurrencies = async (): Promise<{
  [key: string]: string;
} | null> => {
  try {
    const response = await $api
      .get<AllCurrenciesResponse>(endpoints.allCurrency)
      .catch((error) => {
        throw error;
      });

    return response.data.symbols;
  } catch (error: any) {
    showPopup(error.message);
    return null;
  }
};

export const $getExchangeRates = async (): Promise<{
  [key: string]: number;
} | null> => {
  const baseKey = CurrencyService.getBaseCurrency();
  try {
    const response = await $api
      .get<ExchangeRatesResponse>(endpoints.latestExchangeRates, {
        params: {
          base: baseKey,
        },
      })
      .catch((error) => {
        throw error;
      });

    return response.data.rates;
  } catch (error: any) {
    showPopup(error.message);
    return null;
  }
};

export const $convertCurrency = async (
  from: string,
  to: string,
  amount: number,
  setLoading: any,
): Promise<{
  rate: string;
  from: string;
  to: string;
} | null> => {
  try {
    setLoading(true);
    const response = await $api
      .get<ConvertCurrencyResponse>(endpoints.convert, {
        params: {
          from,
          to,
          amount,
        },
      })
      .catch((error) => {
        throw error;
      });

    setLoading(false);

    return {
      from,
      to,
      rate: response.data.info.rate,
    };
  } catch (error: any) {
    showPopup(error.message);
    setLoading(false);
    return null;
  }
};

export default { $getAllCurrencies, $getExchangeRates, $convertCurrency };
