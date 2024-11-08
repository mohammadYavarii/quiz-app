const loading = document.querySelector("#loading");
const allQuestionsCounterText = document.querySelector(
  "#allQuestionsCounterText"
);
const questionsCounterText = document.querySelector("#questionsCounterText");
const qusetionContainer = document.querySelector("#qusetion-container");
const answerContainers = document.querySelectorAll(".answers");
const nextQuestionBtn = document.querySelector("#next-question");
const healthContainer = document.querySelector("#health-container");

let questions = null;

let health = 5;
let qusetionIndex = 0;
let correctIndex = null;
let toggle = false;
let score = 0;

// get url of api
const url = (() => {
  const url = sessionStorage.getItem("url");
  sessionStorage.removeItem("url");
  return url;
})();

// get data from api
async function getQuestions() {
  try {
    const response = await fetch(url);
    questions = await response.json();
    questions = questions.results;
    allQuestionsCounterText.innerText = questions.length;
    showQusetions();
  } catch (err) {
    alert("Something is wrong...");
    history.back();
  }
  loading.style.display = "none";
}

// show qusetions
function showQusetions() {
  let incorectIndex = 0;
  // reset answer containers
  answerContainers.forEach((item) => {
    item.innerText = "";
    item.classList.remove("correct");
    item.classList.remove("incorrect");
  });

  questionsCounterText.innerText = qusetionIndex + 1;
  healthContainer.innerText = health;

  const question = questions[qusetionIndex];
  correctIndex = Math.floor(Math.random() * 3);
  console.log(correctIndex);
  //show answers
  qusetionContainer.innerText = question.question;
  answerContainers[correctIndex].innerText = question.correct_answer;
  answerContainers.forEach((item, index) => {
    if (index != correctIndex) {
      item.innerText = question.incorrect_answers[incorectIndex];
      incorectIndex++;
    }
  });
}

// next question
function nextQuestionHandeler() {
  toggle = false;
  if (qusetionIndex < questions.length - 1) {
    showQusetions();
    qusetionIndex++;
  } else {
    endGame();
  }
}

// end game handeler
function endGame() {
  sessionStorage.setItem("score", String(score));
  location.assign("./endGame.html");
}

// check answers
function checkAnser(event) {
  if (!toggle) {
    if (event.target.innerText === answerContainers[correctIndex].innerText) {
      score += 5;
      event.target.classList.add("correct");
    } else {
      answerContainers[correctIndex].classList.add("correct");
      event.target.classList.add("incorrect");
      health--;
      if (health <= 0) {
        endGame();
      }
    }
  }
  toggle = true;
}

window.addEventListener("DOMContentLoaded", () => {
  getQuestions();
  nextQuestionBtn.addEventListener("click", nextQuestionHandeler);
  answerContainers.forEach((item) =>
    item.addEventListener("click", checkAnser)
  );
});
