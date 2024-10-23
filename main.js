import { generateRandomArray } from "./utils/generateRandomArray";

const arrayContainerElement = document.querySelector(".array-container");
const generateBtnElement = document.querySelector(".generate-btn");

generateBtnElement.addEventListener("click", () => {
  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  console.log(initialArray);

  const renderArray = (array) => {
    arrayContainerElement.innerHTML = ""; // array-container 초기화

    // bar 생성하기.
    array.forEach((value) => {
      const barElement = document.createElement("div");
      barElement.className = "array-bar";
      barElement.style.height = `${value * 3}px`;
      barElement.textContent = value;
      arrayContainerElement.append(barElement);
    });
  };

  renderArray(initialArray);
});
