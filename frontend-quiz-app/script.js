const subjects = document.querySelectorAll(".subjects button");
const titleWidget = document.querySelector(".title-widget");
const initialScreen = document.querySelector(".initial-screen");
const quizScreen = document.querySelector(".quiz-screen");
const headerCat = document.querySelector("header .category");
const quesNumEle = document.getElementById("ques-num");
const questionEle = document.getElementById("question");
const optionsTextEle = document.querySelectorAll(".option-text");
const submitAnsBtn = document.querySelector(".ans-group button");
const inputOptions = document.querySelectorAll(".ans-group input");

let quizzes = [];
let subject = [];
let questions = [];
let quesNum = 0;
let options = [];
let selectedAns = "";

fetch("data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    quizzes = data["quizzes"];
  })
  .catch((err) => {
    console.error(err);
  });

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

const showHeaderCat = () => {
  let subTitle = subject["title"].toLowerCase();

  headerCat.style.display = "flex";
  headerCat.insertAdjacentText("beforeend", subject["title"]);
  headerCat.id = subTitle;
  headerCat.querySelector("img").src = subject["icon"];
  headerCat.querySelector("img").alt = subTitle;
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
  let optionSelected = Array.from(inputOptions).find(
    (inputOption) => inputOption.checked
  );

  selectedAns = optionSelected.parentElement.lastChild.innerText;

  return optionSelected ? true : false;
};

const checkAnswer = (selectedAns) => {
  if (selectedAns === questions[quesNum]["answer"]) {
    alert("true");
    return true;
  } else {
    alert("false");
    return false;
  }
};

subjects.forEach((sub) => {
  sub.addEventListener("click", (e) => {
    subSelected = e.target.id || e.target.alt;
    showQuizScreen();
    extractQuiz(subSelected);
    showHeaderCat();
    showQuestion();
    showOptions();
  });
});

submitAnsBtn.addEventListener("click", () => {
  if (isOptionSelected()) {
    checkAnswer(selectedAns);
  } else {
    alert("please select an option");
  }
  isOptionSelected();
});
