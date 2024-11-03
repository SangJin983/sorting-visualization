export class Model {
  static SELECTED_ALGORITHM = "selectedAlgorithm";
  static SORT_SNAPSHOTS = "sortingSnapshot";

  #data = { [Model.SORT_SNAPSHOTS]: [] };

  setData(key, value) {
    this.#data[key] = value;
  }

  getData(key) {
    return this.#data[key];
  }

  hasData(key) {
    return this.#data[key] !== null && this.#data[key] !== undefined;
  }

  addSortSnapshot(array, highlightedIndices) {
    this.#data[Model.SORT_SNAPSHOTS].push({
      snapshot: array,
      highlights: highlightedIndices,
    });
  }
}
