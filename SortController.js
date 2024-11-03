import { swap } from "./utils/swap";

export const SortController = (() => {
  const addSnapshot = (array, indices, addSnapshotFn) => {
    addSnapshotFn([...array], [...indices]);
  };

  const createBubbleSnapshots = (array, addSnapshotFn) => {
    const result = [...array];

    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result.length - i - 1; j += 1) {
        addSnapshot(result, [j, j + 1], addSnapshotFn);

        if (result[j] > result[j + 1]) {
          swap(result, j, j + 1);
        }
      }
    }
    addSnapshot(result, [], addSnapshotFn);
  };

  const createSelectionSnapshots = (array, addSnapshotFn) => {
    const result = [...array];
    let indexMin;

    for (let i = 0; i < result.length - 1; i += 1) {
      indexMin = i;
      for (let j = i + 1; j < result.length; j += 1) {
        addSnapshot(result, [indexMin, j], addSnapshotFn);

        if (result[j] < result[indexMin]) {
          indexMin = j;
        }
      }
      addSnapshot(result, [indexMin], addSnapshotFn);
      swap(result, i, indexMin);
    }
    addSnapshot(result, [], addSnapshotFn);
  }

  return {
    bubble: createBubbleSnapshots,
    selection: createSelectionSnapshots,
  };
})();
