import { isCashedInStore } from "../../../helpers";

describe("isCashedInStore", () => {
  test("is not called callback if expression is true", () => {
    const mockCallBack = jest.fn();
    isCashedInStore(true, mockCallBack);
    expect(mockCallBack).not.toBeCalled();
  });

  test("is called callback if expression is false", () => {
    const mockCallBack = jest.fn();
    isCashedInStore(false, mockCallBack);
    expect(mockCallBack).toBeCalled();
  });
});
