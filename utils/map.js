export const map = (arr, fn) => {
  const result = [];
  arr.forEach((item) => result.push(fn(item)));
  return result;
};
