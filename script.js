const DEFAULT_COLOR = "gold";
const DEFAULT_MODE = "color";
const DEFAULT_BOARD = "black";

const board = document.querySelector(".board");
const setSize = document.querySelector(".set-size");
const sizeSlider = document.querySelector(".size-slider");
const sizeIndicator = document.querySelector(".size-indicator");
const colorPicker = document.querySelector(".color-pick");
const clearScreen = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");
const colorOption = document.querySelector(".color-option");
const boardColor = document.querySelector(".board-pick");

let colorMode = DEFAULT_MODE;
let color = DEFAULT_COLOR;
let gridSize = sizeSlider.value;
let isDragging = false;
board.style.backgroundColor = DEFAULT_BOARD;

boardColor.addEventListener("input", () => {
  board.style.backgroundColor = boardColor.value;
});

sketchPad(gridSize);

sizeIndicator.textContent = `${gridSize} x ${gridSize}`;

function sketchPad(gridSize) {
  board.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
  board.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
  for (let i = 0; i < gridSize ** 2; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid-item");
    board.appendChild(grid);
  }
  const gridElements = document.querySelectorAll(".grid-item");
  gridElements.forEach((square) => {
    square.addEventListener("mousedown", (e) => {
      isDragging = true;
    });
  });
  gridElements.forEach((square) => {
    square.addEventListener("mousemove", (e) => {
      if (isDragging === true) {
        colorChanger(square);
      }
    });
  });
  window.addEventListener("mouseup", (e) => {
    if (isDragging === true) {
      isDragging = false;
    }
  });
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
colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});
sizeSlider.addEventListener("input", () => {
  newSketch();
});
colorOption.addEventListener("click", () => {
  colorMode = "color";
  color = colorPicker.value;
  buttonSelected();
});
eraser.addEventListener("click", () => {
  colorMode = "eraser";
  color = boardColor.value;
  buttonSelected();
});

clearScreen.addEventListener("click", () => {
  boardColor.value = DEFAULT_BOARD;
  board.style.backgroundColor = DEFAULT_BOARD;

  color = DEFAULT_COLOR;
  colorMode = DEFAULT_COLOR;
  buttonSelected();
  newSketch();
});
function buttonSelected() {
  if (colorMode === "eraser") {
    colorOption.classList.remove("selected");
    eraser.classList.add("selected");
  } else {
    colorOption.classList.add("selected");
    eraser.classList.remove("selected");
  }
}
