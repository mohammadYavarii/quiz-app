const inp = document.querySelector("#questions-count");
const startBtn = document.querySelector("#start");
const dificalityBtns = document.querySelectorAll(".dificality");

// start game
function startGame(url) {
  sessionStorage.setItem("url", url);
  location.assign("./game.html");
}

// make url
function makeUrl() {
  const count = inp.value != 0 ? inp.value : 5;
  let dificality = null;

  dificalityBtns.forEach((item) => {
    if (item.dataset.selected == "true") {
      dificality = item.innerText.toLowerCase();
    }
  });

  startGame(
    `https://opentdb.com/api.php?amount=${count}&difficulty=${dificality}`
  );
  console.log(url);
}

// select difficulty
function selectDificulity(event) {
  dificalityBtns.forEach((item) => {
    item.dataset.selected = "false";
    item.classList.remove("selected");
  });
  event.target.dataset.selected = "true";
  event.target.classList.add("selected");
}

window.addEventListener("DOMContentLoaded", () => {
  dificalityBtns.forEach((item) => {
    item.addEventListener("click", selectDificulity);
  });
  startBtn.addEventListener("click", makeUrl);
});
