// const fetch = require("node-fetch");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";
messageOne.textContent = "Made in JavaScript(node)";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";

  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "",
        messageTwo.textContent = "Could not find location";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastdata;
        console.log(data.location);
        console.log(data.forecastdata);
      }
    });
  });
});
