const subjects = document.querySelectorAll(".subjects button");
const titleWidget = document.querySelector(".title-widget");
const initialScreen = document.querySelector(".initial-screen");
const quizScreen = document.querySelector(".quiz-screen");
const category = document.querySelectorAll(".category-alt");
const quesNumEle = document.getElementById("ques-num");
const questionEle = document.getElementById("question");
const optionsTextEle = document.querySelectorAll(".option-text");
const submitAnsBtn = document.querySelector(".ans-group button");
const inputOptions = document.querySelectorAll(".ans-group input");
const resultScreen = document.querySelector(".result-screen");
const scoreEle = document.getElementById("score");
const playAgainBtn = document.getElementById("play-again");
const errMsg = document.getElementById("err-msg");
const celebrationWidget = document.getElementById("celebration");

let quizzes = [];
let subject = [];
let questions = [];
let quesNum = 0;
let options = [];
let selectedAns = "";
let optionSelected = null;
let score = 0;
let sound = new Audio("/assets/party-popper.mp3");

// chatgpt recommended way of fetching data when user interacts
// and not on page load like I was previously doing
const loadQuizData = async () => {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    quizzes = data["quizzes"];
  } catch (err) {
    console.error(err);
  }
};

const extractQuiz = (subSelected) => {
  if (subSelected === "html") {
    subject = quizzes[0];
  } else if (subSelected === "css") {
    subject = quizzes[1];
  } else if (subSelected === "javascript") {
    subject = quizzes[2];
  } else {
    subject = quizzes[3];
  }

  questions = subject["questions"];
};

const showQuizScreen = () => {
  titleWidget.style.display = "none";
  initialScreen.style.display = "none";
  quizScreen.style.display = "grid";
};

const showResultScreen = () => {
  quizScreen.style.display = "none";
  titleWidget.style.display = "block";
  resultScreen.style.display = "block";
  scoreEle.innerText = score;
  titleWidget.firstElementChild.innerHTML =
    "Quiz completed <span>You scored... </span>";
  titleWidget.lastElementChild.style.display = "none";
};

const showInitialScreen = () => {
  resultScreen.style.display = "none";
  initialScreen.style.display = "block";
  titleWidget.firstElementChild.innerHTML =
    "Welcome to the <span>Frontend Quiz!</span>";
  titleWidget.lastElementChild.style.display = "block";
};

const showHeaderCat = () => {
  let subTitle = subject["title"].toLowerCase();

  category.forEach((cat) => {
    cat.id = subTitle;
    cat.style.display = "flex";
    cat.insertAdjacentHTML(
      "beforeend",
      `
      <div class="option">
              <img src="${subject["icon"]}" alt="${subTitle}" width="30" />
            </div><span>${subject["title"]}</span>
      `
    );
  });
};

const showQuestion = () => {
  quesNumEle.innerText = quesNum + 1;
  questionEle.innerText = questions[quesNum]["question"];
  options = questions[quesNum]["options"];
};

const showOptions = () => {
  let optionNum = 0;

  optionsTextEle.forEach((optionTextEle) => {
    optionTextEle.innerText = options[optionNum];
    optionNum += 1;
  });
};

const isOptionSelected = () => {
  optionSelected = Array.from(inputOptions).find(
    (inputOption) => inputOption.checked
  );

  if (optionSelected) {
    selectedAns = optionSelected.parentElement.lastChild.innerText;
  }

  return optionSelected ? true : false;
};

const checkAnswer = (selectedAns) => {
  if (selectedAns === questions[quesNum]["answer"]) {
    score += 1;
    return true;
  } else {
    return false;
  }
};

const applyAnswerStyle = () => {
  if (checkAnswer(selectedAns)) {
    optionSelected.parentElement.classList.add("correct-ans-selected");
    optionSelected.parentElement.classList.add("correct-ans");
  } else {
    optionSelected.parentElement.classList.add("wrong-ans");
    optionSelected.parentElement.classList.add("wrong-ans-selected");
  }
};

// chatgpt recommendation
// to club enabling and diabling in one function
const toggleOptions = (disabledState) => {
  inputOptions.forEach((inputOption) => {
    inputOption.disabled = disabledState;
    inputOption.parentElement.style.cursor = disabledState
      ? "default"
      : "pointer";
  });
};

const reset = () => {
  toggleOptions(false); // enables options
  optionSelected.checked = false;
  optionSelected.parentElement.className = "category";
  options = [];
  selectedAns = "";
  optionSelected = null;
};

const showCelebration = () => {
  confetti({
    particleCount: 200,
    spread: 360,
  });
};

const partyPopperSound = () => {
  sound.play();
};

subjects.forEach((sub) => {
  sub.addEventListener("click", async (e) => {
    // subSelected = e.target.id || e.target.alt;
    subSelected = e.target.closest("button").id; // chatgpt recommendation
    await loadQuizData(); // chatgpt recommendation
    showQuizScreen();
    extractQuiz(subSelected);
    showHeaderCat();
    showQuestion();
    showOptions();
  });
});

submitAnsBtn.addEventListener("click", () => {
  if (isOptionSelected()) {
    errMsg.style.display = "none";
    if (submitAnsBtn.innerText === "Submit Answer") {
      applyAnswerStyle();
      toggleOptions(true); // disables option

      if (quesNum === 9) {
        submitAnsBtn.innerText = "See Score";
      } else {
        submitAnsBtn.innerText = "Next Question";
      }
    } else if (submitAnsBtn.innerText === "Next Question") {
      reset();
      submitAnsBtn.innerText = "Submit Answer";
      quesNum += 1;
      showQuestion();
      showOptions();
    } else if (submitAnsBtn.innerText === "See Score") {
      reset();
      if (score === 10) {
        partyPopperSound();
        showCelebration();
      }
      showResultScreen();
      submitAnsBtn.innerText = "Submit Answer";
    }
  } else {
    errMsg.style.display = "flex";
  }
});

playAgainBtn.addEventListener("click", () => {
  showInitialScreen();
  score = 0;
  quesNum = 0;
  category.forEach((cat) => {
    cat.innerHTML = "";
  });
});
