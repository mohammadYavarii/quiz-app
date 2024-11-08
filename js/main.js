const loading = document.querySelector("#loading");
const allQuestionsCounterText = document.querySelector(
  "#allQuestionsCounterText"
);
const questionsCounterText = document.querySelector("#questionsCounterText");
const qusetionContainer = document.querySelector("#qusetion-container");
const answerContainers = document.querySelectorAll(".answers");
const nextQuestionBtn = document.querySelector("#next-question");

let questions = null;
let qusetionIndex = 0;
let correctIndex = null;

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
  questionsCounterText.innerText = qusetionIndex + 1;
  const question = questions[qusetionIndex];
  correctIndex = Math.floor(Math.random() * 3);
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
  if (qusetionIndex < questions.length - 1) {
    qusetionIndex++;
    showQusetions();
  } else {
    alert("End");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getQuestions();
  nextQuestionBtn.addEventListener("click", nextQuestionHandeler);
});
