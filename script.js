// ===============================
// ELEMENTS
// ===============================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const threat = document.getElementById("threat");
const cryEmoji = document.getElementById("cryEmoji");
const bgMusic = document.getElementById("bgMusic");

// ===============================
// NO BUTTON LOGIC
// ===============================
let clickCount = 0;

const threats = [
  "Are you sure?",
  "Really sure...??? ☹️",
  "Take a moment and think 👿",
  "You might regret this 🔪",
  "I’ll wait…"
];

noBtn.addEventListener("click", () => {
  cryEmoji.style.display = "block";

  if (clickCount < threats.length) {
    threat.innerText = threats[clickCount];
  }

  yesBtn.style.transform = `scale(${1 + clickCount * 0.4})`;
  clickCount++;

  if (clickCount > threats.length) {
    noBtn.style.display = "none";
  }
});

// ===============================
// YES BUTTON LOGIC
// ===============================
yesBtn.addEventListener("click", () => {
  message.innerText =
    "I knew it.\n\nCongratulations… you’re officially the luckiest man on this planet to be my Valentine.\nLove you to the moon and back, my sweet boy. Ummmaaahhh 💗";

  noBtn.style.display = "none";
  cryEmoji.style.display = "none";
  threat.innerText = "";

  fadeInMusic(bgMusic);

  setTimeout(() => {
    document.getElementById("giftModal").classList.remove("hidden");
  }, 5000);

  startFireworks();
});

// ===============================
// FIREWORKS (SAFE)
// ===============================
const canvas = document.getElementById("confetti");
let ctx = null;

if (canvas) {
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startFireworks() {
  if (!ctx) return;

  let particles = [];
  const startTime = Date.now();

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;

    for (let i = 0; i < 25; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        lif
