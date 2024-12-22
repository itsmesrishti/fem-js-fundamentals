const passwordLengthEle = document.getElementById("char-length");
const passwordSlider = document.getElementById("slider");
const submitBtn = document.getElementsByTagName("button")[0];
const passwordFeatures = document.querySelectorAll(".password-features input");
const passwordEle = document.getElementById("password");

const generatePassword = (passwordLength, featureParams) => {
  let regex = /[a-zA-Z0-9~`!@#$%^&*()\-+=\[\]{}|\\:;"'<>,.?/]/;
  fetch(`https://api.genratr.com/?length=${passwordLength}${featureParams}`)
    .then((response) => response.json())
    .then((data) => {
      if (regex.test(data.password)) {
        passwordEle.value = data.password;
      } else {
        "lol"
      }
    });
};

passwordSlider.addEventListener("input", () => {
  passwordLengthEle.innerText = passwordSlider.value;
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const passwordLength = passwordSlider.value;

  let featureChecked = 0;
  let featureParams = "";

  for (let feature of passwordFeatures) {
    if (feature.checked) {
      featureParams += `&${feature.value}`;
      featureChecked += 1;
    }
  }

  if (featureChecked > 0) {
    if (passwordFeatures.length > passwordLength) {
      alert("Please select enough length of password");
    } else {
      generatePassword(passwordLength, featureParams);
    }
  } else {
    alert("please select a feature");
  }
});
