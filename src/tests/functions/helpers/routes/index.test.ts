import { mapRoutes } from "../../../../helpers/routes";
import appRoutes from "../../../../routes/routes";

describe("mapRoutes", () => {
  test("is return expacted numbers of elements", () => {
    expect(mapRoutes(appRoutes)).toHaveLength(3);
  });
});
