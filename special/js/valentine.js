const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 150);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

document.getElementById("yesBtn").addEventListener("click", () => {
  loadPage("final"); // your love message page
});