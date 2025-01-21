const subjects = document.querySelectorAll(".subjects button");
const titleWidget = document.querySelector(".title-widget");
const initialScreen = document.querySelector(".initial-screen");
const quizScreen = document.querySelector(".quiz-screen");
const header = document.querySelector("header");

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

subjects.forEach((subject) => {
  subject.addEventListener("click", (e) => {
    // alert(e.target.alt || e.target.id);
    titleWidget.style.display = "none";
    initialScreen.style.display = "none";
    quizScreen.style.display = "grid";
    showHeaderCat(e.target.alt || e.target.id);
  });
});
