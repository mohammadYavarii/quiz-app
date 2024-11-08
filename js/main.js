const loading = document.querySelector("#loading");

let questions = null;

const url = (() => {
  const url = sessionStorage.getItem("url");
  sessionStorage.removeItem("url");
  return url;
})();

async function getQuestions() {
  try {
    const response = await fetch(url);
    questions = await response.json();
  } catch (err) {
    alert("Something is wrong...");
    history.back();
  }
  loading.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  getQuestions();
});
