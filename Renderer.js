import { pause } from "./utils/pause";

export class Renderer {
  render() {
    throw new Error("상속을 통해서 구현하세요!");
  }
}

export class SnapshotsRenderer extends Renderer {
  static isRendering = false;

  static async render(snapshots, container) {
    this.isRendering = true;
    for (const { snapshot, highlights, swap } of snapshots) {
      // 랜더링 중단 조건
      if (!this.isRendering) {
        break;
      }
      BarGroupRenderer.render(snapshot, container);
      highlightRenderer.render(highlights);
      await pause(0);
      // 스왑 랜더링
      if (Object.keys(swap).length > 0) {
        BarGroupRenderer.updateSwappedBars(swap);
      }
      await pause(800);
    }
    this.isRendering = false;
  }

  static cancleRendering() {
    this.isRendering = false;
  }
}

export class BarGroupRenderer extends Renderer {
  static render(array, container) {
    container.innerHTML = ""; // container 초기화

    // bar 생성하기
    array.forEach((value) => {
      BarRenderer.render(value, container); // container에 해당 value의 bar 그리기
    });
  }

  static updateSwappedBars(swap) {
    const barGroup = document.querySelectorAll(".array-bar");

    Object.entries(swap).forEach(([index, newValue]) => {
      const bar = barGroup[Number(index)];

      if (bar) {
        bar.style.backgroundColor = "green";
        bar.style.height = `${newValue * 3}px`; // 높이 변경
        bar.textContent = newValue;
      }
    });
  }
}

export class BarRenderer extends Renderer {
  static render(value, container) {
    const barElement = document.createElement("div");
    barElement.className = "array-bar";
    barElement.style.height = `${value * 3}px`;
    barElement.textContent = value;
    container.append(barElement);
  }
}

export class highlightRenderer extends Renderer {
  static render(indices) {
    const barGroup = document.querySelectorAll(".array-bar");
    barGroup.forEach((bar, index) => {
      bar.style.backgroundColor = indices.includes(index) ? "red" : "";
    });
  }
}
