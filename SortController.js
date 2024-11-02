export const SortController = (() => {
  const createSortSnapshots = {
    bubble: (array, addSnapshotFn) => {
      const result = [...array];

      for (let i = 0; i < result.length; i += 1) {
        for (let j = 0; j < result.length - i - 1; j += 1) {
          addSnapshotFn([...result], [j, j + 1]);

          if (result[j] > result[j + 1]) {
            [result[j], result[j + 1]] = [result[j + 1], result[j]];
          }
        }
      }
      addSnapshotFn([...result], []);
    },
    selection: (array, addSnapshotFn) => {
      const result = [...array];
      let indexMin;

      for (let i = 0; i < result.length - 1; i += 1) {
        indexMin = i;
        for (let j = i + 1; j < result.length; j += 1) {
          addSnapshotFn([...result], [indexMin, j]);

          if (result[j] < result[indexMin]) {
            indexMin = j;
          }
        }
        addSnapshotFn([...result], [indexMin]);
        [result[i], result[indexMin]] = [result[indexMin], result[i]];
      }
      addSnapshotFn([...result], []);
    },
  };

  return createSortSnapshots;
})();