import { BarRenderer } from "./Renderer";

export class SortingVisualizer {
  constructor(array) {
    this.array = [...array];
  }

  visualize() {
    throw new Error("상속으로 구현하세요!");
  }
}

export class BubbleSortVisualizer extends SortingVisualizer {
  constructor(array, bars) {
    super(array);
    this.bars = bars;
  }

  async visualize() {
    const result = [...this.array];
    const barsElement = this.bars;

    // 버블 정렬 시각화 로직
    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result.length - i - 1; j += 1) {
        // 비교 중인 바 색깔 설정
        BarRenderer.setBackgroundColor(
          "red",
          barsElement[j],
          barsElement[j + 1]
        );

        // 1초 대기 후 진행
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (result[j] > result[j + 1]) {
          // 스왑
          [result[j], result[j + 1]] = [result[j + 1], result[j]];

          // 랜더 중인 바의 상태를 업데이트
          BarRenderer.updateBar(result[j], barsElement[j]);
          BarRenderer.updateBar(result[j + 1], barsElement[j + 1]);
        }

        // 비교 중인 바의 색깔 리셋
        BarRenderer.setBackgroundColor("", barsElement[j], barsElement[j + 1]);
      }
    }
  }
}

export class SelectionSortVisualizer extends SortingVisualizer {
  constructor(array, bars) {
    super(array);
    this.bars = bars;
  }

  async visualize() {
    const result = [...this.array];
    const barsElement = this.bars;
    let indexMin;

    for (let i = 0; i < result.length - 1; i += 1) {
      indexMin = i;
      BarRenderer.setBackgroundColor("red", barsElement[indexMin]); // bar1 선택
      let lastIndex;
      for (let j = i + 1; j < result.length; j += 1) {
        BarRenderer.setBackgroundColor("red", barsElement[j]); // bar2 선택

        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기

        // 크기 비교 후, 더 작은 bar 선택
        if (result[j] < result[indexMin]) {
          BarRenderer.setBackgroundColor("", barsElement[indexMin]); // bar1 취소
          indexMin = j;
        } else {
          BarRenderer.setBackgroundColor("", barsElement[j]); // bar2 취소
        }
        
        // 마지막 인덱스 저장
        lastIndex = j;
      }
      // 최종 비교: 가장 작은 값을 1초간 표시
      if (result[indexMin] < result[lastIndex]) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        BarRenderer.setBackgroundColor("", barsElement[indexMin]);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        BarRenderer.setBackgroundColor("", barsElement[lastIndex]);
      }
      // 스왑
      [result[i], result[indexMin]] = [result[indexMin], result[i]];
      BarRenderer.updateBar(result[i], barsElement[i]);
      BarRenderer.updateBar(result[indexMin], barsElement[indexMin]);
    }
  }
}
