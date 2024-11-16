import { formatedData, getDataFromAnotherPage } from "./helper.js";

const loading = document.querySelector("#loading");
const gameDisplay = document.querySelector("#game");
const questionContainer = document.querySelector("#question-container");
const answesContainer = document.querySelectorAll(".answes");
const questionNumberContainer = document.querySelector("#question-number");
const scoreNumberContainer = document.querySelector("#score-number");
const nextBtn = document.querySelector("#next");
const finishBtn = document.querySelector("#finish");

const URL =
  sessionStorage.getItem("url") ||
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let questionIndex = 0;
const CURECT_BONUS = 10;
let score = 0;
let flag = true;
let correctAnswer = null;
let data = [];

// show questions
const showQusetion = () => {
  const { question, answers, correctIndex } = data[questionIndex];
  questionContainer.innerText = question;
  answesContainer.forEach((item, index) => {
    item.innerText = answers[index];
  });
  correctAnswer = correctIndex;
  console.log(correctAnswer);
};

// get data from an api
const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    data = formatedData(json.results);
    showQusetion();
    // hide loading and show display
    loading.style.display = "none";
    gameDisplay.style.display = "block";
  } catch (err) {
    // create error handeler
    document.body.innerHTML = "";
    const message = document.createElement("h1");
    message.innerText = "Something is wrong...";
    const button = document.createElement("button");
    button.addEventListener("click", () => location.reload());
    button.style.marginTop = "2em";
    button.innerText = "Reload";

    document.body.append(message);
    document.body.append(button);
  }
};

// check answer after click
const checkAnswerHandeler = (event, index) => {
  if (flag) {
    if (index == correctAnswer) {
      event.target.classList.add("true-answer");
      score += CURECT_BONUS;
      scoreNumberContainer.innerText = score;
    } else {
      event.target.classList.add("false-answer");
      answesContainer[correctAnswer].classList.add("true-answer");
    }
  }
  flag = false;
};

// finish game
const finishHandeler = () => {
  sessionStorage.setItem("score", JSON.stringify(score));
  location.assign("../pages/end.html");
};

// next question
const nextQuestionHandeler = () => {
  if (questionIndex != data.length - 1) {
    answesContainer.forEach((item) => {
      item.classList.remove("true-answer");
      item.classList.remove("false-answer");
    });
    questionIndex++;
    questionNumberContainer.innerText = questionIndex + 1;
    flag = true;
    showQusetion();
  } else {
    finishHandeler();
  }
};

window.addEventListener("load", () => {
  fetchData();
  nextBtn.addEventListener("click", nextQuestionHandeler);
  finishBtn.addEventListener("click", finishHandeler);
  answesContainer.forEach((item, index) =>
    item.addEventListener("click", (event) => checkAnswerHandeler(event, index))
  );
});
