/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/prefer-default-export
export const isCashedInStore = (expression: boolean, func: any) => {
  if (!expression) func();
};

export const findNumbersInArray = (array: any[]) => {
  return array.filter((item) => {
    return !isNaN(item);
  });
};

export const findOnlyCharactersInArray = (array: any[]) => {
  return array.filter((item) => {
    return isNaN(item.trim());
  });
};

export const getCurrenciesKeysInArrayOfCharacters = (
  array: any[],
): {
  fromCurrencyKey: string;
  toCurrencyKey: string;
} => {
  const indexOfInWord = array.indexOf("i");

  const fromCurrencyKey = array
    .filter((_, index) => index < indexOfInWord)
    .join("")
    .toUpperCase();
  const toCurrencyKey = array
    .filter((_, index) => index > indexOfInWord + 1)
    .join("")
    .toUpperCase();

  return { fromCurrencyKey, toCurrencyKey };
};
