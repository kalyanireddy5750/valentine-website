const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const threat = document.getElementById("threat");
const cryEmoji = document.getElementById("cryEmoji");

let clickCount = 0;

const threats = [
  "Are you sure? 😠",
  "Think about it 🔪",
  "Last chance 😈"
];

noBtn.addEventListener("click", () => {
  cryEmoji.style.display = "block";

  if (clickCount < threats.length) {
    threat.innerText = threats[clickCount];
  }

  const scale = 1 + clickCount * 0.5;
  yesBtn.style.transform = `scale(${scale})`;

  clickCount++;

  if (clickCount > threats.length) {
    noBtn.style.display = "none";
    yesBtn.style.transform = "scale(4)";
  }
});

yesBtn.addEventListener("click", () => {
  message.innerText =
    "WOWWWWWWWW 💖✨ Congratulations you're officially the luckiest man on this planet to be my Valentine 🥰💋 Love you to the moon and back my sweet boy… ummmaaahhh 😘😘";

  noBtn.style.display = "none";
  cryEmoji.style.display = "none";
  threat.innerText = "";

  startConfetti();
});

/* 🎉 Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startConfetti() {
  let pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
