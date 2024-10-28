import { generateRandomArray } from "./utils/generateRandomArray";
import { ArrayRenderer } from "./Renderer";
import { BubbleSortVisualizer } from "./SortingVisualizer";

const arrayContainerElement = document.querySelector(".array-container");
const btnContainerElement = document.querySelector(".btn-container");
const generateBtnElement = document.querySelector(".generate-btn");
const sortingBtnElement = document.querySelector(".sorting-btn");

const buttons = Array.from(btnContainerElement.children);

// `배열 생성` 버튼 클릭시, 무작위 배열 생성 (10 ~ 100)
generateBtnElement.addEventListener("click", () => {
  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  ArrayRenderer.render(initialArray, arrayContainerElement);
});

// `정렬 시작` 버튼 클릭시, 버블 정렬
sortingBtnElement.addEventListener("click", async () => {
  const bars = getBars();
  const array = getArrayFromItems(bars);
  const bubbleSortVisualizer = new BubbleSortVisualizer(array, bars);
  
  setButtonDisabled(true, buttons);
  await bubbleSortVisualizer.visualize();
  setButtonDisabled(false, buttons);
});

const setButtonDisabled = (isDisabled, buttons) => {
  buttons.forEach((btn) => (btn.disabled = isDisabled));
};

const getArrayFromItems = (items) => {
  return Array.from(items).map((item) => Number(item.textContent));
};

const getBars = () => {
  return document.querySelectorAll(".array-bar");
};