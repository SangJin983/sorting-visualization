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
        BarRenderer.setBackgroundColor("red", barsElement[j], barsElement[j + 1]);

        // 1초 대기 후 진행
        await new Promise(resolve => setTimeout(resolve, 1000));

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
