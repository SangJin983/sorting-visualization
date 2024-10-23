import { it, expect } from "vitest";
import { generateRandomArray } from "../utils/generateRandomArray";

it("should generate random array.", () => {
  const array = generateRandomArray(8, 10, 100);
  expect(array.length === 8).toBe(true);
  expect(array.every((number) => number >= 10 && number <= 100)).toBe(true);
});
