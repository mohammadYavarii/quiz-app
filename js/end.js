import { getDataFromAnotherPage } from "./helper.js";

const score = getDataFromAnotherPage("score") || 0;
const highScoreHistory = JSON.parse(localStorage.getItem("highScore")) || [];

const scoreContainer = document.querySelector("#score-container");
const saveBtn = document.querySelector("#save");
const input = document.querySelector("#save-input");

const saveHandeler = () => {
  const name = input.value;
  if (name.length && score > 0) {
    const highScore = {
      userName: name,
      score: score,
    };
    highScoreHistory.push(highScore);
    highScoreHistory.sort((a, b) => b.score - a.score);
    highScoreHistory.splice(10);

    localStorage.setItem("highScore", JSON.stringify(highScoreHistory));
    location.assign("../index.html");
  } else {
    alert("invalid username or score ");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  scoreContainer.innerText = score;
  saveBtn.addEventListener("click", saveHandeler);
});
