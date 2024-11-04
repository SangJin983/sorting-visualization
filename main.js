import { generateRandomArray } from "./utils/generateRandomArray";
import { SnapshotsRenderer, BarGroupRenderer } from "./Renderer";
import { Model } from "./Model";
import { SortController } from "./SortController";

const selectContainerElement = document.querySelector(".select-container");
const arrayContainerElement = document.querySelector(".array-container");
const btnContainerElement = document.querySelector(".btn-container");
const generateBtnElement = document.querySelector(".generate-btn");
const sortingBtnElement = document.querySelector(".sorting-btn");

const buttons = Array.from(btnContainerElement.children);

// Model 인스턴스 생성 및 초기화
const model = new Model();
model.setData(Model.SELECTED_ALGORITHM, "none");

// 정렬 알고리즘 선택
selectContainerElement.addEventListener("change", (event) => {
  arrayContainerElement.innerHTML = ""; // 배열 컨테이너 초기화
  model.setData(Model.SELECTED_ALGORITHM, event.target.value); // 알고리즘 선택
  SnapshotsRenderer.cancleRendering(); // 랜더링 취소
});

// `배열 생성` 버튼 클릭시, 무작위 배열 생성 (10 ~ 100)
generateBtnElement.addEventListener("click", () => {
  if (
    !model.hasData(Model.SELECTED_ALGORITHM) ||
    model.getData(Model.SELECTED_ALGORITHM) === "none"
  ) {
    console.error("정렬 알고리즘이 선택되지 않았습니다.");
    return;
  }

  const initialArray = generateRandomArray(10, 10, 100); // size, min, max
  BarGroupRenderer.render(initialArray, arrayContainerElement);
});

// `정렬 시작` 버튼 클릭시, 선택한 정렬 실행
sortingBtnElement.addEventListener("click", async () => {
  if (
    !model.hasData(Model.SELECTED_ALGORITHM) ||
    model.getData(Model.SELECTED_ALGORITHM) === "none"
  ) {
    console.error("정렬 알고리즘이 선택되지 않았습니다.");
    return;
  }

  if (getBars().length === 0) {
    console.error("배열을 생성하세요.");
    return;
  }

  setButtonDisabled(true, buttons);

  model.setData(Model.SORT_SNAPSHOTS, null);

  // 스냅샷 생성
  const selectedAlgorithm = model.getData(Model.SELECTED_ALGORITHM);
  const snapshots =
    selectedAlgorithm === "bubble"
      ? SortController.createBubbleSnapshots(getArrayFromItems(getBars()))
      : SortController.createSelectionSnapshots(getArrayFromItems(getBars()));
      
  model.setData(Model.SORT_SNAPSHOTS, snapshots);

  // 스냅샷 랜더링
  await SnapshotsRenderer.render(
    model.getData(Model.SORT_SNAPSHOTS),
    arrayContainerElement
  );

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
