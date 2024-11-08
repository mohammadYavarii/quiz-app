const saveBtn = document.querySelector("#save");
const getBaackBtn = document.querySelector("#getBaack");
const cycle = document.querySelector("#cycle");

// get high scores
const hightScores = JSON.parse(localStorage.getItem("hightScores")) || [];

// get and show scores
const score = (() => {
  const res = sessionStorage.getItem("score");
  sessionStorage.removeItem("score");
  return res;
})();

// save high score
function saveHandeler() {
  const name = prompt("Enter a name : ");
  hightScores.push({
    name,
    score,
  });
  console.log(hightScores);
  localStorage.setItem("hightScores", JSON.stringify(hightScores));
  location.assign("../index.html");
}

window.addEventListener("DOMContentLoaded", () => {
  cycle.innerText = score;
  getBaackBtn.addEventListener("click", () => location.assign("../index.html"));
  saveBtn.addEventListener("click", saveHandeler);
});
