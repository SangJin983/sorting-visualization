export class Model {
  static SELECTED_ALGORITHM = "selectedAlgorithm";
  
  #data = {};

  setData(key, value) {
    this.#data[key] = value;
  }

  getData(key) {
    return this.#data[key];
  }

  hasData(key) {
    return this.#data[key] !== null || this.#data[key] !== undefined;
  }
}
