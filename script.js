const DEFAULT_COLOR = "gold";

const board = document.querySelector(".board");
const setSize = document.querySelector(".set-size");
const sizeSlider = document.querySelector(".size-slider");
const sizeIndicator = document.querySelector(".size-indicator");
const colorPicker = document.querySelector(".color-pick");
const clearScreen = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");

let color = DEFAULT_COLOR;
let gridSize = sizeSlider.value;
let isDragging = false;

sketchPad(gridSize);

sizeIndicator.textContent = `${gridSize} x ${gridSize}`;

function sketchPad(gridSize) {
  board.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
  board.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
  for (let i = 0; i < gridSize ** 2; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid-item");
    board.appendChild(grid);
    grid.addEventListener("mousedown", (e) => {
      isDragging = true;
    });
    grid.addEventListener("mousemove", (e) => {
      if (isDragging === true) {
        colorChanger(grid);
      }
    });
    window.addEventListener("mouseup", (e) => {
      if (isDragging === true) {
        isDragging = false;
      }
    });
  }
}

function newSketch() {
  board.textContent = "";
  gridSize = sizeSlider.value;
  sketchPad(gridSize);
  sizeIndicator.innerHTML = `${gridSize} x ${gridSize}`;
}

function colorChanger(grid) {
  grid.style.setProperty("--color", `${color}`);
}

sizeSlider.addEventListener("input", () => {
  newSketch();
});
colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});
eraser.addEventListener("click", () => {
  color = black;
});

clearScreen.addEventListener("click", () => {
  color = DEFAULT_COLOR;
  newSketch();
});
