const form = document.getElementById("form");
const pictureEle = document.querySelector("picture");
const initialContent = document.querySelector(".subscription-content");
const successContent = document.querySelector(".success-content");
const dismissBtn = document.getElementById("dismiss-btn");
const mailEle = document.getElementById("user-mail");
const userInput = document.getElementById("input");
const errorMsg = document.getElementById("error-msg");

function showSuccessMessage() {
    pictureEle.style.display = "none";
    initialContent.style.display = "none";
    successContent.classList.add("show");
    mailEle.innerText = userInput.value;
}

function showInitialScreen() {
    pictureEle.style.display = "block";
    initialContent.style.display = "block";
    successContent.classList.remove("show");
    userInput.value = "";
}

function showErrorMessage() {
    errorMsg.style.display = "block";
    userInput.classList.add("error");
}

function hideErrorMessage() {
    errorMsg.style.display = "none";
    userInput.classList.remove("error");
}

function checkEmail(email) {
    const regex = /\w+@[\w]+\.[a-z]{2,4}$/;
    return regex.test(email);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    if (userInput.value && checkEmail(userInput.value)) {
        showSuccessMessage();
    } else {
        showErrorMessage();
    }
});

dismissBtn.addEventListener("click", e => {
    showInitialScreen();
    hideErrorMessage();
    userInput.classList.remove("valid-email");
});


// smart input (extra feature)
// will show the status of input as valid or invalid as it is being typed
userInput.addEventListener("input", () => {
    if (checkEmail(userInput.value)) {
        hideErrorMessage();
        userInput.classList.add("valid-email");
    } else {
        showErrorMessage();
        userInput.classList.remove("valid-email");
    }
});