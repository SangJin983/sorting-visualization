const arrayContainerElement = document.querySelector(".array-container");

const initialArray = [30, 60, 90, 20, 50, 80, 10, 70, 40, 100];

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
