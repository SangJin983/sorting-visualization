import { pause } from "./utils/pause";

export class Renderer {
  render() {
    throw new Error("상속을 통해서 구현하세요!");
  }
}

export class SnapshotsRenderer extends Renderer {
  static async render(snapshots, container) {
    for (const obj of snapshots) {
      BarGroupRenderer.render(obj.snapshot, container);
      highlightRenderer.render(obj.highlights);
      await pause(1000);
    }
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
