let bars = document.querySelectorAll(".bar");
let customerNumbers;

console.log(bars);
calculateBars();

function getBar(i) {
  return bars[i];
}

function setBarHeight(i, height) {
  return (getBar(i).style.height = height + "px");
}

function calculateBars() {
  for (let i = 0; i < bars.length; i++) {
    displayBar(i);
  }
}

function displayBar(i) {
  setBarHeight(i, getCustomerNumber(30, 100));
}

function getCustomerNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
