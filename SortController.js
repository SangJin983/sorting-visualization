import { swap } from "./utils/swap";

export const SortController = (snapshotCallback) => {
  const addSnapshot = (array, indices) => {
    snapshotCallback([...array], [...indices]);
  };

  const createBubbleSnapshots = (array) => {
    const result = [...array];

    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result.length - i - 1; j += 1) {
        addSnapshot(result, [j, j + 1]);

        if (result[j] > result[j + 1]) {
          swap(result, j, j + 1);
        }
      }
    }
    addSnapshot(result, []);
  };

  const createSelectionSnapshots = (array) => {
    const result = [...array];
    let indexMin;

    for (let i = 0; i < result.length - 1; i += 1) {
      indexMin = i;
      for (let j = i + 1; j < result.length; j += 1) {
        addSnapshot(result, [indexMin, j]);

        if (result[j] < result[indexMin]) {
          indexMin = j;
        }
      }
      addSnapshot(result, [indexMin]);
      swap(result, i, indexMin);
    }
    addSnapshot(result, []);
  }

  return {
    bubble: createBubbleSnapshots,
    selection: createSelectionSnapshots,
  };
};
