import { it, expect } from "vitest";
import { map } from "../utils/map";

it("should map", () => {
  expect(map([1, 2, 3], (num) => num + 1)).toEqual([2, 3, 4]);
});
