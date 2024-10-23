console.log("hello");

const hiBtnElement = document.querySelector(".hi-button");
const containerElement = document.querySelector(".container");

hiBtnElement.addEventListener("click", () => {
  const textDiv = document.createElement("div");
  textDiv.textContent = "hello, lezi";
  containerElement.append(textDiv);
});
