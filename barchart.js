"use strict";

let queueArray = [];
let bars = [];
let loopTimeout;
const minCustomers = 0,
  maxCustomers = 32,
  maxLoopTime = 100,
  barHeightModifier = 3,
  loopSpeed = 100,
  redBarMinHeight = 31;

let barNumber = 40;

startBarChartAnimation();

let slider = document.getElementById("myRange");
slider.addEventListener("change", changeBarNumber);

function changeBarNumber() {
  barNumber = slider.value;
  console.log(slider.value);
  document.querySelector(".bars").innerHTML = "";
  startBarChartAnimation();
}

function startBarChartAnimation() {
  initBars();
  createBars(barNumber);
  loopBars();
}

function setBarHeight(i, height) {
  return (bars[i].style.height = height + "px");
}

function getCustomerNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function initBars() {
  window.clearTimeout(loopTimeout);

  for (let i = 0; i <= barNumber; i++) {
    let queueSize = getCustomerNumber(0, maxCustomers);
    queueArray[i] = queueSize;
  }
}

function createBars(nr) {
  for (let i = 0; i <= nr; i++) {
    let barElement = document.createElement("div");
    barElement.className = "bar";
    document.querySelector(".bars").appendChild(barElement);
  }
  bars = document.querySelectorAll(".bar");
}

function loopBars() {
  for (let i = 0; i < maxLoopTime; i++) {
    loopTimeout = setTimeout(() => {
      queueArray.push(getCustomerNumber(0, 32));
      queueArray.shift(0);
      displayBars();
    }, i * loopSpeed);
  }
}

function displayBars() {
  for (let j = 0; j < bars.length; j++) {
    displayBar(j, queueArray[j] * barHeightModifier);
  }
}

function displayBar(bar, height) {
  setBarHeight(bar, height);
  if (bar <= 20) {
    bars[bar].style.opacity = bar * 4 + "%";
    bars[bar].style.filter = `grayscale(${(100 - bar * 5) * 2}%)`;
  }
  if (parseInt(bars[bar].style.height) / barHeightModifier >= 30) {
    bars[bar].style.backgroundColor = "red";
  } else {
    bars[bar].style.backgroundColor = "green";
  }
}
