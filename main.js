import { generateRandomArray } from "./utils/generateRandomArray";

const arrayContainerElement = document.querySelector(".array-container");
const generateBtnElement = document.querySelector(".generate-btn");
const sortingBtnElement = document.querySelector(".sorting-btn");

// `배열 생성` 버튼 클릭시, 무작위 배열 생성 (10 ~ 100)
generateBtnElement.addEventListener("click", () => {
  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  renderArray(initialArray);
});

// `정렬 시작` 버튼 클릭시, 버블 정렬
sortingBtnElement.addEventListener("click", async () => {
  sortingBtnElement.disabled = true;
  generateBtnElement.disabled = true;
  await bubbleSort(getCurrentArray());
  sortingBtnElement.disabled = false;
  generateBtnElement.disabled = false;
});

// 배열 시각화
const renderArray = (array) => {
  arrayContainerElement.innerHTML = ""; // array-container 초기화

  // bar 생성하기
  array.forEach((value) => {
    const barElement = document.createElement("div");
    barElement.className = "array-bar";
    barElement.style.height = `${value * 3}px`; // bar 높이 설정
    barElement.textContent = value;
    arrayContainerElement.append(barElement);
  });
};

// 현재 배열 확인
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
      // 비교 중인 bar 색깔 변경
      barsElement[j].style.backgroundColor = "red";
      barsElement[j + 1].style.backgroundColor = "red";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (result[j] > result[j + 1]) {
        // 스왑
        [result[j], result[j + 1]] = [result[j + 1], result[j]];

        // 스왑에 해당하는 bar의 높이와 값을 변경
        barsElement[j].textContent = result[j];
        barsElement[j].style.height = `${result[j] * 3}px`;
        barsElement[j + 1].textContent = result[j + 1];
        barsElement[j + 1].style.height = `${result[j + 1] * 3}px`;
      }

      // 비교 중인 bar의 색깔 리셋
      barsElement[j].style.backgroundColor = "";
      barsElement[j + 1].style.backgroundColor = "";
    }
  }
};
