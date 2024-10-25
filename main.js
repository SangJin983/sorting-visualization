import { generateRandomArray } from "./utils/generateRandomArray";
import { ArrayRenderer, BarRenderer } from "./Renderer";

const arrayContainerElement = document.querySelector(".array-container");
const btnContainerElement = document.querySelector(".btn-container");
const generateBtnElement = document.querySelector(".generate-btn");
const sortingBtnElement = document.querySelector(".sorting-btn");

// `배열 생성` 버튼 클릭시, 무작위 배열 생성 (10 ~ 100)
generateBtnElement.addEventListener("click", () => {
  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  ArrayRenderer.render(initialArray, arrayContainerElement);
});

// `정렬 시작` 버튼 클릭시, 버블 정렬
sortingBtnElement.addEventListener("click", async () => {
  setButtonDisabled(true, getButtons());
  await bubbleSort(getCurrentArray());
  setButtonDisabled(false, getButtons());
});

const setButtonDisabled = (isDisabled, buttons) => {
  buttons.forEach((btn) => (btn.disabled = isDisabled));
};

const getButtons = () => {
  return Array.from(btnContainerElement.children);
};

const getCurrentArray = () => {
  const barsElement = document.querySelectorAll(".array-bar");
  const currentArray = Array.from(barsElement).map((bar) =>
    Number(bar.textContent)
  );
  return currentArray;
};

// 버블 정렬 시각화
const bubbleSort = async (array) => {
  const result = [...array];
  const barsElement = document.querySelectorAll(".array-bar");

  for (let i = 0; i < result.length; i += 1) {
    for (let j = 0; j < result.length - i - 1; j += 1) {
      // 비교 중인 bar 색깔 설정
      BarRenderer.setBackgroundColor("red", barsElement[j], barsElement[j + 1]);

      // 1초 대기 후 진행
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (result[j] > result[j + 1]) {
        // 스왑
        [result[j], result[j + 1]] = [result[j + 1], result[j]];

        // 랜더 중인 바의 상태를 업데이트
        BarRenderer.updateBar(result[j], barsElement[j]);
        BarRenderer.updateBar(result[j + 1], barsElement[j + 1]);
      }

      // 비교 중인 bar의 색깔 리셋
      BarRenderer.setBackgroundColor("", barsElement[j], barsElement[j + 1]);
    }
  }
};
