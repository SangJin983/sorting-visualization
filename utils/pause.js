export const pause = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
