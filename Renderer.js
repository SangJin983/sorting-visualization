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
    for (const { snapshot, highlights } of snapshots) {
      // 랜더링 중단 조건
      if (!this.isRendering) {
        break;
      }
      BarGroupRenderer.render(snapshot, container);
      highlightRenderer.render(highlights);
      await pause(1000);
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
}

export class BarRenderer extends Renderer {
  static render(value, container) {
    const barElement = document.createElement("div");
    barElement.className = "array-bar";
    barElement.style.height = `${value * 3}px`; // bar 높이 설정
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
