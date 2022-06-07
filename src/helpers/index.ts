/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/prefer-default-export
export const isCashedInStore = (expression: boolean, func: any) => {
  if (!expression) func();
};
