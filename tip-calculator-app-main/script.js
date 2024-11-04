const tipBtns = document.querySelectorAll(".labels button");
const calcBtn = document.getElementById("calc-btn");
const inputCustom = document.getElementById("custom-input");
const inputBill = document.getElementById("bill");
const inputPeople = document.getElementById("num-people");
const tipOutput = document.getElementById("tip");
const totalOutput = document.getElementById("total-amount");
const allInputs = document.querySelectorAll("input");
const resetBtn = document.getElementById("reset");

const showAlert = (bill, numOfPeople) => {
  if (!bill) {
    alert("Enter bill!");
  } else if (!numOfPeople) {
    alert("Enter number of people!");
  } else if (numOfPeople === "0") {
    errMsg[0].style.display = "block";
  } else if (numOfPeople >= "1") {
    errMsg[0].style.display = "none";
  } else if (numOfPeople < "0") {
    alert("ERROR: Number of people cannot be negative!");
  }
};

const calculateTip = (bill, numOfPeople, tipSelected) => {
  bill = Number(bill);
  numOfPeople = Number(numOfPeople);

  const tip = (bill * (Number(tipSelected) / 100)).toFixed(2);
  const tipPerPerson = (tip / numOfPeople).toFixed(2);
  return tipPerPerson;
};

const calculateTotal = (bill, numOfPeople, tipPerPerson) => {
  bill = Number(bill);
  numOfPeople = Number(numOfPeople);
  const totalPerPerson = ((bill / numOfPeople) + Number(tipPerPerson)).toFixed(2);
  return totalPerPerson;
};

const updateOutput = (bill, numOfPeople, tipSelected) => {
  const tipPerPerson = calculateTip(bill, numOfPeople, tipSelected);
  tipOutput.innerHTML = "$" + tipPerPerson;
  totalOutput.innerHTML = "$" + calculateTotal(bill, numOfPeople, tipPerPerson);
};

const highlightTip = (ele) => {
  if (ele.type === "button") {
    ele.classList.add("tip-selected");
  } else {
    inputCustom.classList.add("tip-selected");
  }
};

const disableInput = () => {
  allInputs.forEach((input) => {
    input.setAttribute("disabled", "disabled");
    input.style.cursor = "not-allowed";
  });
  tipBtns.forEach((btn) => {
    btn.setAttribute("disabled", "disabled");
    btn.style.cursor = "not-allowed";
  });
  calcBtn.style.cursor = "not-allowed";
};

const enableInput = () => {
  allInputs.forEach((input) => {
    input.removeAttribute("disabled", "disabled");
    input.style.cursor = "pointer";
  });
  tipBtns.forEach((btn) => {
    btn.removeAttribute("disabled", "disabled");
    btn.style.cursor = "pointer";
  });
  calcBtn.style.cursor = "pointer";
  calcBtn.style.display = "none";
};

const extractInputValues = (e) => {
  const tipSelected = e.target.dataset.tip
    ? e.target.dataset.tip
    : inputCustom.value;
  const bill = inputBill.value;
  const numOfPeople = inputPeople.value;

  if (bill && numOfPeople && tipSelected) {
    updateOutput(bill, numOfPeople, tipSelected);
    highlightTip(e.target);
    disableInput();
    resetBtn.classList.add("active-btn");
  } else {
    showAlert(bill, numOfPeople);
  }
};

tipBtns.forEach((btn) => btn.addEventListener("click", extractInputValues));
inputCustom.addEventListener("change", () => {
  calcBtn.style.display = "block";
});
calcBtn.addEventListener("click", extractInputValues);

resetBtn.addEventListener("click", () => {
  document.querySelector(".tip-selected").classList.remove("tip-selected");
  tipOutput.innerHTML = "$0.00";
  totalOutput.innerHTML = "$0.00"; 
  enableInput();
  resetBtn.classList.remove("active-btn");
});
