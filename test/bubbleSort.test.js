import { it, expect } from "vitest";
import { bubbleSort } from "../utils/bubbleSort";

it("should sort", () => {
  expect(bubbleSort([1, 4, 3, 2, 5])).toEqual([1, 2, 3, 4, 5]);
});
