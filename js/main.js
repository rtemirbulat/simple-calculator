// var val = document.getElementById(".screen-input");
// var numbers = document.querySelectorAll(".button-num");
// var screen = document.getElementById(".screen-input");

// function btnClick() {
//   numbers.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       val = parseInt(event.target.innerText);
//       screen = val;
//       screen.innerText = val;
//     });
//   });
// }
let runningTotal = 0;
let bufferInput = "0";
let previousPressed = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}
function handleNumber(value) {
  if (bufferInput === "0") {
    bufferInput = value;
  } else {
    bufferInput += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      bufferInput = "0";
      runningTotal = 0;
      previousPressed === null;
      break;
    case "=":
      if (previousPressed === null) {
        return;
      }
      flushOperation(parseInt(bufferInput));
      previousPressed = null;
      bufferInput = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (bufferInput === 1) {
        bufferInput = "0";
      } else {
        bufferInput = bufferInput.substring(0, bufferInput.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}
function handleMath(value) {
  const intBuffer = parseInt(bufferInput);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousPressed = value;
  bufferInput = "0";
}
function flushOperation(intBuffer) {
  if (previousPressed === "+") {
    runningTotal += intBuffer;
  } else if (previousPressed === "-") {
    runningTotal -= intBuffer;
  } else if (previousPressed === "x") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = bufferInput;
}
