// function loadPage(page) {
//   fetch(`pages/${page}.html`)
//     .then(res => res.text())
//     .then(html => {
//       document.getElementById("app").innerHTML = html;
//     });
// }
//
// // Start here
// loadPage("login");

function loadPage(page) {
  const app = document.getElementById("app");
  const current = app.querySelector(".page");

  if (current) {
    current.classList.add("exit");
    setTimeout(() => renderPage(page), 400);
  } else {
    renderPage(page);
  }
}

function renderPage(page) {
    fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      const app = document.getElementById("app");
      app.innerHTML = html;

      // 🔥 RUN PAGE-SPECIFIC LOGIC
      if (page === "intro" && typeof initScratch === "function") {
        setTimeout(initScratch, 100);
      }
      if (page === "memories" || page === "letters" || page === "final") {
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("active");
    });
  }, 50);
}
    });
}
function goBackToLogin() {
  loadPage("login");
}

// initial load
loadPage("login");