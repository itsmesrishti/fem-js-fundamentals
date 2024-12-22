const passwordLengthEle = document.getElementById("char-length");
const passwordSlider = document.getElementById("slider");
const submitBtn = document.getElementsByTagName("button")[0];
const passwordFeatures = document.querySelectorAll(".password-features input");
const passwordEle = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const copyMsg = document.getElementById("copy-msg");
const strengthBars = Array.from(document.getElementsByClassName("bar"));
const strengthEle = document.getElementById("strength");

let charArr = [];
let features = [];
let featureChecked = 0;
let symbols = [];
let numbers = [];
let upper = [];
let lower = [];
let password = "";

const reset = () => {
  charArr = [];
  features = [];
  upper = [];
  lower = [];
  numbers = [];
  symbols = [];
  password = "";
  copyMsg.style.display = "none";
  strengthBars.forEach(bar => bar.classList = "bar");
  strengthEle.innerText = "";
  strengthEle.style.display = "none";
};

const createCharLib = (startingVal, endingVal, feature) => {
  for (let i = startingVal; i < endingVal + 1; i++) {
    charArr.push(String.fromCharCode(i));

    if (feature === "symbols") {
      symbols.push(String.fromCharCode(i));
    } else if (feature === "numbers") {
      numbers.push(String.fromCharCode(i));
    } else if (feature === "upper") {
      upper.push(String.fromCharCode(i));
    } else if (feature === "lower") {
      lower.push(String.fromCharCode(i));
    }
  }
};

const generateCharArr = (features) => {
  if (features.includes("uppercase")) {
    createCharLib(65, 90, "upper");
  }
  if (features.includes("lowercase")) {
    createCharLib(97, 122, "lower");
  }
  if (features.includes("numbers")) {
    createCharLib(48, 57, "numbers");
  }
  if (features.includes("symbols")) {
    createCharLib(33, 47, "symbols");
    createCharLib(58, 64, "symbols");
    createCharLib(91, 96, "symbols");
    createCharLib(123, 126, "symbols");
  }
};

const generatePassword = (passwordLength) => {
  if (features.includes("uppercase")) {
    password += upper[Math.floor(Math.random() * upper.length)];
  }
  if (features.includes("lowercase")) {
    password += lower[Math.floor(Math.random() * lower.length)];
  }
  if (features.includes("numbers")) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  if (features.includes("symbols")) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  for (let i = 0; i < passwordLength - features.length; i++) {
    let randomIndex = Math.floor(Math.random() * charArr.length);
    password += charArr[randomIndex];
  }

  passwordEle.value = password;
};

const checkPasswordStrength = (passwordLength) => {
  strengthEle.style.display = "block";
  if (passwordLength > 7) {
    strengthEle.innerText = "strong";
    strengthBars.forEach(bar => bar.classList.add("strong"));
  } else if (passwordLength <=7 && passwordLength > 5) {
    strengthEle.innerText = "medium";
    strengthBars.slice(0, -1).forEach(bar => bar.classList.add("medium"));
  } else if (passwordLength <= 5 && passwordLength >= 4) {
    strengthEle.innerText = "weak";
    strengthBars.slice(0, -2).forEach(bar => bar.classList.add("weak"));
  } else {
    strengthEle.innerText = "too-weak";
    strengthBars[0].classList.add("too-weak");
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(password)
  .then(() => {
    copyMsg.style.display = "block";
  })
  .catch(err => {
    console.error(`Error copying text to clipboard: ${err}`)
  })
})

passwordSlider.addEventListener("input", () => {
  passwordLengthEle.innerText = passwordSlider.value;
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  reset();

  const passwordLength = passwordSlider.value;

  for (let feature of passwordFeatures) {
    if (feature.checked) {
      features.push(feature.value);
      featureChecked += 1;
    }
  }

  if (featureChecked > 0) {
    if (features.length > passwordLength) {
      alert("Please select enough length of password");
    } else {
      generateCharArr(features);
      generatePassword(passwordLength);
      checkPasswordStrength(passwordLength);
    }
  } else {
    alert("please select");
  }
});
