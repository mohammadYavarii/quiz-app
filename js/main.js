const url = (() => {
  const url = sessionStorage.getItem("url");
  sessionStorage.removeItem("url");
  return url;
})();

console.log(url);
