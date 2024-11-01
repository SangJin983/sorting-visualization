export const createBubbleSortSnapshots = (array, addSnapshotFn) => {
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
};
