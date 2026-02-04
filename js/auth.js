function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  const msg = document.getElementById("msg");
  const hint = document.getElementById("hint");

  hint.textContent = "";

  if (u === "december" && p === "sagittarius") {
    msg.style.color = "green";
    msg.textContent = "Access granted 💖";
    loadPage("intro");
  } else {
    msg.style.color = "red";
    msg.textContent = "Try again 🙄";
    /*document.getElementById("msg").textContent = "Try again 😶";*/
  }
}

function showHint() {
  const msg = document.getElementById("msg");
  const hint = document.getElementById("hint");

  // CLEAR error message when showing hint
  msg.textContent = "";
  hint.textContent="Hint: Our month and zodiac sign ❤️";
}