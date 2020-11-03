"use strict";

// Initializes
function UrlShortner() {
  // Shortcuts to DOM Elements.
  this.input = document.getElementById("input");
  this.output = document.getElementById("output");
  this.snackbar = document.getElementById("snackbar");
  this.shortenButton = document.getElementById("shorten");

  this.shortenButton.addEventListener("click", this.shortenUrl.bind(this));
  const buttonTogglingHandler = this.toggleButton.bind(this);
  this.input.addEventListener("change", buttonTogglingHandler);
  this.input.addEventListener("keyup", buttonTogglingHandler);
}

// Shorten the URL
UrlShortner.prototype.shortenUrl = async function (e) {
  e.preventDefault();
  const apiurl = "https://4wstaoc5s6.execute-api.ap-northeast-1.amazonaws.com/post"
  const param = {
    method: "POST",
    mode: "cors",
    body: this.input.value
  }
  try {
    const response = await fetch(apiurl, param)
    if (!response.ok) throw "ok propertyi is false"
    const body = await response.json()
    this.output.value = body
    this.successSnackbar();

  } catch (err) {
    console.log(err)
    this.errorSnackbar();
  }
};

UrlShortner.prototype.toggleButton = function () {
  if (this.input.value) {
    this.shortenButton.removeAttribute("disabled");
  } else {
    this.shortenButton.setAttribute("disabled", "true");
  }
};

UrlShortner.prototype.successSnackbar = function () {
  this.snackbar.style.backgroundColor = "#2196f3";
  this.snackbar.MaterialSnackbar.showSnackbar({message: "URLを短縮しました"});
};

UrlShortner.prototype.errorSnackbar = function () {
  this.snackbar.style.backgroundColor = "#f44336";
  this.snackbar.MaterialSnackbar.showSnackbar({message: "処理に失敗しました"});
};

window.onload = function () {
  // Initializes MailForm.
  window.UrlShortner = new UrlShortner();
};
