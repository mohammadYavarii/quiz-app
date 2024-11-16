let difficaltyLevel = "easy";
let amount = 5;

let BASE_URL = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;

const questionCount = document.querySelector("#question-count");
const difficaltyBtns = document.querySelectorAll(".difficalty-btns");

// save for send to other pages
const saveURL = () => {
  sessionStorage.setItem("url", BASE_URL);
};

// get amount
const countQuestionsHandeler = (event) => {
  const value = event.target.value;
  if (value > 5) {
    amount = value;
    BASE_URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficaltyLevel}&type=multiple`;

    saveURL();
  }
};

// get difficality
const selectDifficaltyHandeler = (event) => {
  const level = event.target.innerText;
  difficaltyLevel = level;
  BASE_URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficaltyLevel}&type=multiple`;

  saveURL();
};

window.addEventListener("DOMContentLoaded", () => {
  difficaltyBtns.forEach((item) =>
    item.addEventListener("click", selectDifficaltyHandeler)
  );

  questionCount.addEventListener("keyup", countQuestionsHandeler);
  saveURL();
});
