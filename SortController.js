import { swap } from "./utils/swap";

export const SortController = {
  createBubbleSnapshots: (array) => {
    const result = [...array];
    const snapshots = [];

    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result.length - i - 1; j += 1) {
        snapshots.push({
          snapshot: [...result],
          highlights: [j, j + 1],
          swap: {},
        });

        if (result[j] > result[j + 1]) {
          snapshots.push({
            snapshot: [...result],
            highlights: [j, j + 1],
            swap: { [j]: result[j + 1], [j + 1]: result[j] },
          });

          swap(result, j, j + 1);
        }
      }
    }
    snapshots.push({ snapshot: [...result], highlights: [], swap: {} });

    return snapshots;
  },

  createSelectionSnapshots: (array) => {
    const result = [...array];
    const snapshots = [];

    let indexMin;

    for (let i = 0; i < result.length - 1; i += 1) {
      indexMin = i;
      for (let j = i + 1; j < result.length; j += 1) {
        snapshots.push({
          snapshot: [...result],
          highlights: [indexMin, j],
          swap: {},
        });

        if (result[j] < result[indexMin]) {
          indexMin = j;
          snapshots.push({
            snapshot: [...result],
            highlights: [indexMin],
            swap: {},
          });
        }
      }
      snapshots.push({
        snapshot: [...result],
        highlights: [indexMin, i],
        swap: {},
      });
      
      snapshots.push({
        snapshot: [...result],
        highlights: [indexMin, i],
        swap: { [i]: result[indexMin], [indexMin]: result[i] },
      });
      swap(result, i, indexMin);
    }
    snapshots.push({ snapshot: [...result], highlights: [], swap: {} });

    return snapshots;
  },
};
