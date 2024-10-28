export class Renderer {
  render() {
    throw new Error("상속을 통해서 구현하세요!");
  }
}

export class ArrayRenderer {
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

  static setBackgroundColor(color, ...bars) {
    bars.forEach((bar) => (bar.style.backgroundColor = color));
  }

  static updateBar(value, bar) {
    bar.style.height = `${value * 3}px`;
    bar.textContent = value;
  }
}
