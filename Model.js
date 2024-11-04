export class Model {
  static SELECTED_ALGORITHM = "selectedAlgorithm";
  static SORT_SNAPSHOTS = "sortingSnapshot";

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
}
