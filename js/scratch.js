// wait for the page to be injected into the DOM
setTimeout(initScratch, 100);

function initScratch() {
  const canvas = document.getElementById("scratchCanvas");
  const btn = document.getElementById("continueBtn");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // IMPORTANT: force real size
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  // Draw solid scratch cover
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#bfbfbf";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "18px Arial";
  ctx.fillStyle = "#555";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Scratch here 💕", canvas.width / 2, canvas.height / 2);

  let scratching = false;

  // ---- EVENT HELPERS ----
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function start(e) {
    e.preventDefault();
    scratching = true;
  }

  function stop() {
    scratching = false;
  }

  function scratch(e) {
    if (!scratching) return;
    e.preventDefault();

    const { x, y } = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  }

  // ---- MOUSE ----
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);
  canvas.addEventListener("mousemove", scratch);

  // ---- TOUCH ----
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchend", stop);
  canvas.addEventListener("touchcancel", stop);
  canvas.addEventListener("touchmove", scratch, { passive: false });

  // ---- REVEAL CHECK ----
  function checkReveal() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  let cleared = 0;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) cleared++;
  }

  const percent = cleared / (pixels.length / 4);

  if (percent > 0.4) {
    canvas.classList.add("canvas-exit");

setTimeout(() => {
  canvas.style.display = "none";
  btn.classList.add("show-btn");
}, 450);

spawnKisses();
  }
}
function revealMoment() {
  // Fade the text AFTER unlock
  document.querySelector(".hidden-text").classList.add("fade-text");

  spawnKisses();
}


 function spawnKisses() {
     for (let i = 0; i < 14; i++) {
         const kiss = document.createElement("div");
         kiss.textContent = "💋";
         kiss.className = "kiss";

         kiss.style.left = Math.random() * 100 + "vw";
         kiss.style.bottom = "-20px";
         kiss.style.animationDelay = `${Math.random() * 0.8}s`;

         document.body.appendChild(kiss); // 🔥 IMPORTANT

         setTimeout(() => kiss.remove(), 3000);
     }
 }

}