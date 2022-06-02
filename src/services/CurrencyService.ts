import {
  findNumbersInArray,
  findOnlyCharactersInArray,
  getCurrenciesKeysInArrayOfCharacters,
} from "../helpers";

const BASE_CURRENCY_KEY = "baseCurrency";
const ALL_CURRENCIES_KEY = "allCurrencies";

export default class CurrencyService {
  static saveBaseCurrency(currencyKey: string) {
    localStorage.setItem(BASE_CURRENCY_KEY, currencyKey);
  }

  static getBaseCurrency() {
    return localStorage.getItem(BASE_CURRENCY_KEY);
  }

  static setAllAvaibleCurrencies(currencies: string[]) {
    localStorage.setItem(ALL_CURRENCIES_KEY, JSON.stringify(currencies));
  }

  static getAllAvaibleCurrencies() {
    const stringedArrayOfCurrencies =
      localStorage.getItem(ALL_CURRENCIES_KEY) || "";

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!stringedArrayOfCurrencies) {
      const parsedArrayOfCurrencies = JSON.parse(stringedArrayOfCurrencies);

      return parsedArrayOfCurrencies;
    }

    return false;
  }

  static prepareDataToConvertation(inputValue: string): {
    amount: number;
    symbolsOfCurrencies: {
      fromCurrencyKey: string;
      toCurrencyKey: string;
    };
  } | null {
    if (inputValue.trim()) {
      const currencySymbol = inputValue.trim().replaceAll(" ", "");
      const stringInArray = currencySymbol.split("");

      const amount = +findNumbersInArray(stringInArray).join("");
      const arrayOfStringOnlyWithKey = findOnlyCharactersInArray(stringInArray);
      const symbolsOfCurrencies = getCurrenciesKeysInArrayOfCharacters(
        arrayOfStringOnlyWithKey,
      );

      return { amount, symbolsOfCurrencies };
    }

    return null;
  }
}
