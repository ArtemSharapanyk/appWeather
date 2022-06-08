import { CitiesService } from "../../../services/CitiesServices";

const CITIES_LIST_KEY = "cities";

class LocalStorageMock {
  store: {
    [key: string]: string;
  };

  constructor() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }
}

global.localStorage = new LocalStorageMock() as any;

beforeEach(() => {
  localStorage.setItem(CITIES_LIST_KEY, "");
});

describe("deleteCity is worked", () => {
  test("is return filtered array", () => {
    const mockValue = [
      {
        name: "London",
      },
      {
        name: "Kiev",
      },
    ];

    expect(CitiesService.deleteCity("London", mockValue as any)).toEqual([
      {
        name: "Kiev",
      },
    ]);
  });

  test("is delete from local storage", () => {
    const mockValue = [
      {
        name: "London",
      },
      {
        name: "Kiev",
      },
    ];
    CitiesService.setCities(mockValue as any);

    CitiesService.deleteCity("London", mockValue as any);
    expect(JSON.parse(localStorage.getItem(CITIES_LIST_KEY) || "")).toEqual([
      {
        name: "Kiev",
      },
    ]);
  });
});

describe("addCity is worked", () => {
  test("is return city", () => {
    const mockValue = {
      name: "London",
      key: "London__key",
    };

    expect(CitiesService.addCity(mockValue as any)).toEqual(mockValue);
  });

  test("is add city to localstorage", () => {
    const mockValue = {
      name: "London",
      key: "London__key",
    };

    CitiesService.addCity(mockValue as any);
    expect(JSON.parse(localStorage.getItem(CITIES_LIST_KEY) || "")).toEqual([
      mockValue,
    ]);
  });
});
