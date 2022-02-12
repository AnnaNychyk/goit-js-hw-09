const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const DELAY = 1000;
let colorChangeInterval = null;
stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener("click", () => {
  colorSwitcher = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startButton.disabled = true;
    stopButton.disabled = false;
  }, DELAY);
});


stopButton.addEventListener("click", () => {
  clearInterval(colorSwitcher);
    stopButton.disabled = true;
    startButton.disabled = false;
});

