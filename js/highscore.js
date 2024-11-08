const clearBtn = document.querySelector("#clear");
const getBackBtn = document.querySelector("#getBack");
const container = document.querySelector(".container");

let hightScores = JSON.parse(localStorage.getItem("hightScores")) || [];
hightScores = hightScores.sort((a, b) => {
  return b.score - a.score;
});

function show() {
  if (hightScores.length) {
    hightScores.forEach((item) => {
      container.innerHTML += `<div class="scores"><span>${item.name}</span> <span>${item.score}</span></div>`;
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  show();
  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    container.innerHTML = "";
  });
  getBackBtn.addEventListener("click", () => history.back());
});
