import { generateRandomArray } from "./utils/generateRandomArray";
import { ArrayRenderer } from "./Renderer";
import {
  BubbleSortVisualizer,
  SelectionSortVisualizer,
} from "./SortingVisualizer";

const selectContainerElement = document.querySelector(".select-container");
const arrayContainerElement = document.querySelector(".array-container");
const btnContainerElement = document.querySelector(".btn-container");
const generateBtnElement = document.querySelector(".generate-btn");
const sortingBtnElement = document.querySelector(".sorting-btn");

const buttons = Array.from(btnContainerElement.children);

// 알고리즘을 선택
let selectedSortAlgorithm;

selectContainerElement.addEventListener("change", (event) => {
  arrayContainerElement.innerHTML = "" // 배열 컨테이너 초기화
  selectedSortAlgorithm = createSortVisualizer(event.target.value);
});

const createSortVisualizer = (value) => {
  if (value === "bubble") {
    return (array, bars) => {
      return new BubbleSortVisualizer(array, bars);
    };
  }

  if (value === "selection") {
    return (array, bars) => {
      return new SelectionSortVisualizer(array, bars);
    };
  }

  return null;
};

// `배열 생성` 버튼 클릭시, 무작위 배열 생성 (10 ~ 100)
generateBtnElement.addEventListener("click", () => {
  if (!selectedSortAlgorithm) {
    console.error("정렬 알고리즘이 선택되지 않았습니다.");
    return;
  }
  
  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  ArrayRenderer.render(initialArray, arrayContainerElement);
});

// `정렬 시작` 버튼 클릭시, 선택한 정렬 실행
sortingBtnElement.addEventListener("click", async () => {
  if (!selectedSortAlgorithm) {
    console.error("정렬 알고리즘이 선택되지 않았습니다.");
    return;
  }

  if (getBars().length === 0) {
    console.error("배열을 생성하세요.");
    return;
  }

  const bars = getBars();
  const array = getArrayFromItems(bars);
  const sortVisualizer = selectedSortAlgorithm(array, bars);

  setButtonDisabled(true, buttons);
  await sortVisualizer.visualize();
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
