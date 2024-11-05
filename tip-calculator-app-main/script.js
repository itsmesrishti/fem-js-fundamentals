const tipBtns = document.querySelectorAll(".labels button");
const calcBtn = document.getElementById("calc-btn");
const inputCustom = document.getElementById("custom-input");
const errMsg = document.getElementById("error-msg");
const inputPeople = document.getElementById("num-people");
const inputBill = document.getElementById("bill");
const resetBtn = document.getElementById("reset");
const tipOutput = document.getElementById("tip");
const totalOutput = document.getElementById("total-amount");

const showError = () => {
  errMsg.style.display = "block";
  inputPeople.classList.add("error");
};

const hideError = () => {
  errMsg.style.display = "none";
  inputPeople.classList.remove("error");
};

const showAlert = (bill, numOfPeople) => {
  if (!bill) {
    alert("Enter bill!");
  } else if (!numOfPeople) {
    alert("Enter number of people!");
  } else if (numOfPeople === "0") {
    showError();
  } else if (numOfPeople >= "1") {
    hideError();
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
  const totalPerPerson = (bill / numOfPeople + Number(tipPerPerson)).toFixed(2);
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

const extractNCalc = (e) => {
  const tipSelected = e.target.dataset.tip
    ? e.target.dataset.tip
    : inputCustom.value;
  const bill = inputBill.value;
  const numOfPeople = inputPeople.value;

  showAlert(bill, numOfPeople);

  if (tipSelected, bill, numOfPeople) {
    resetBtn.removeAttribute("disabled");
    resetBtn.style.cursor = "pointer";
    resetBtn.classList.add("active-btn");

    if (numOfPeople >= "1") {
      updateOutput(bill, numOfPeople, tipSelected);
      highlightTip(e.target);
      disableInput();
    }
  }
};

tipBtns.forEach((btn) => btn.addEventListener("click", extractNCalc));
inputCustom.addEventListener("change", () => {
  calcBtn.style.display = "block";
});
calcBtn.addEventListener("click", extractNCalc);

resetBtn.addEventListener("click", () => {
  resetBtn.classList.remove("active-btn");
  hideError();

  document.querySelector(".tip-selected").classList.remove("tip-selected");
  tipOutput.innerHTML = "$0.00";
  totalOutput.innerHTML = "$0.00";
  calcBtn.style.display = "none";

  enableInput();
});
