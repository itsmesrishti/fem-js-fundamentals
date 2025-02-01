const subjects = document.querySelectorAll(".subjects button");
const titleWidget = document.querySelector(".title-widget");
const initialScreen = document.querySelector(".initial-screen");
const quizScreen = document.querySelector(".quiz-screen");
const resultScreen = document.querySelector(".result-screen");
const header = document.querySelector("header");
const quesNum = document.getElementById("ques-num");
const question = document.getElementById("question");
const ansGroup = document.querySelector(".ans-group");
const options = document.querySelectorAll(".ans-group .category");
const optionsOnly = document.querySelectorAll(".ans-group input");
const optionsContent = document.querySelectorAll(".ans-group .option-text");
const submitAnsBtn = document.querySelector(".ans-group button");
const scoreEle = document.getElementById("score");
const headingEle = document.querySelector("h1");
const subheadingEle = document.querySelector(".title-widget p");
const playAgainBtn = document.getElementById("play-again");

let htmlQuiz = [];
let cssQuiz = [];
let jsQuiz = [];
let accQuiz = [];
let score = 0;
let q = 0;
let nextBtn = undefined;
let isAnswerSubmitted = false;
let selectedAns = "";

fetch("data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    htmlQuiz = data["quizzes"][0]["questions"];
    cssQuiz = data["quizzes"][1]["questions"];
    jsQuiz = data["quizzes"][2]["questions"];
    accQuiz = data["quizzes"][3]["questions"];
  })
  .catch((err) => {
    console.error(err);
  });

const showHeaderCat = (subject) => {
  header.insertAdjacentHTML(
    "afterbegin",
    `
        <div class="category" id="${subject}">
        <div class="option">
          <img src="/assets/images/icon-${
            subject === "javascript" ? "js" : subject
          }.svg" alt="${subject}" width="30" />
        </div>
        ${
          subject === "html"
            ? "HTML"
            : subject === "css"
            ? "CSS"
            : subject === "javascript"
            ? "JavaScript"
            : subject
        }
      </div>
        `
  );
};

const setQuiz = (quizSub) => {
  quesNum.innerText = q + 1;

  question.innerText = quizSub[q]["question"];

  let o = 0;

  optionsContent.forEach((optionContent) => {
    optionContent.innerText = quizSub[q]["options"][o];
    o++;
  });
};

const setSubject = (subject) => {
  if (subject === "html") {
    setQuiz(htmlQuiz);
  }
};

const checkAnswer = (selectedAns) => {
  if (selectedAns === htmlQuiz[q]["answer"]) {
    console.log(score);
    score += 1;
    return true;
  } else {
    return false;
  }
};

const disableOptions = () => {
  options.forEach((option) => {
    option.firstChild.setAttribute("disabled", "disabled");
    option.style.cursor = "default";
  });
};

const enableOptions = () => {
  options.forEach((option) => {
    option.firstChild.removeAttribute("disabled");
    option.style.cursor = "pointer";
  });
};

const reset = () => {
  enableOptions();

  // reset options
  optionsContent.forEach((optionContent) => {
    optionContent.innerText = "";
  });

  // remove answer state class from category
  options.forEach((option) => {
    if (option.firstChild.checked) {
      option.className = "category";

      // remove default checked state
      // when moving between questions
      option.firstChild.checked = false;
    }
  });
};

const getUserAnswer = () => {
  options.forEach((option) => {
    if (option.firstChild.checked) {
      selectedAns = option.lastChild.innerText;
    }
  });

  return selectedAns;
};

const applyAnswerStyle = (selectedAns) => {
  if (checkAnswer(selectedAns)) {
    options.forEach((option) => {
      if (option.firstChild.checked) {
        option.classList.add("correct-ans-selected");
        option.classList.add("correct-ans");
      }
    });
  } else {
    options.forEach((option) => {
      if (option.firstChild.checked) {
        option.classList.add("wrong-ans-selected");
      }
      if (option.innerText === htmlQuiz[0]["answer"]) {
        option.classList.add("correct-ans");
      }
    });
  }
};

const checkOptionSelected = () => {
  optionsOnly.forEach(option => {
    if (option.checked) {
      console.log("checked")
      return true;
    } else {
      console.log("not checked");
      return false;
    }
  })
}

const submitBtnListener = () => {
  submitAnsBtn.addEventListener("click", () => {  
      if (isAnswerSubmitted) {
        submitAnsBtn.innerText = "Submit Answer";
        enableOptions();
        reset();
        setQuiz(htmlQuiz);
        isAnswerSubmitted = false;
      } else {
        selectedAns = getUserAnswer();
        applyAnswerStyle(selectedAns);
        disableOptions();
        if (q < 9) {
          submitAnsBtn.innerText = "Next Question";
          isAnswerSubmitted = true;
          q++;
        } else {
          titleWidget.style.display = "block";
          resultScreen.style.display = "block";
          scoreEle.innerText = score;
          quizScreen.style.display = "none";
          headingEle.innerHTML = `Quiz completed<span>You scored...</span>`;
          subheadingEle.style.display = "none";
        }
      }
    
  });
};

submitBtnListener();

subjects.forEach((subject) => {
  subject.addEventListener("click", (e) => {
    titleWidget.style.display = "none";
    initialScreen.style.display = "none";
    quizScreen.style.display = "grid";
    showHeaderCat(e.target.alt || e.target.id);
    setSubject(e.target.alt || e.target.id);
  });
});

headingEle.innerHTML = `Welcome to the<span>Frontend Quiz!</span>`;

playAgainBtn.addEventListener("click", () => {
  initialScreen.style.display = "block";
  resultScreen.style.display = "none";
  headingEle.innerHTML = `Welcome to the<span>Frontend Quiz!</span>`;
  score = 0;
  q = 0;
})
