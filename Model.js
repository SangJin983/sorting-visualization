export class Model {
  static SELECTED_ALGORITHM = "selectedAlgorithm";
  static SORT_SANPSHOTS = "sortingSnapshot";

  #data = {};

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
    if (!this.hasData(Model.SORT_SANPSHOTS)) {
      this.#data[Model.SORT_SANPSHOTS] = [];
    }
    this.#data[Model.SORT_SANPSHOTS].push({
      snapshot: array,
      highlights: highlightedIndices,
    });
  }
}
