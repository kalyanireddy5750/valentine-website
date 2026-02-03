const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const threat = document.getElementById("threat");
const cryEmoji = document.getElementById("cryEmoji");

let clickCount = 0;

const threats = [
  "Are you sure?",
  "Take a moment and think.",
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

yesBtn.addEventListener("click", () => {
  message.innerText =
    "I knew it.\n\n wowwwwwwww... congratulations you're officially the luckiest man on this planet to be my Valentine.\nLove you to the moon and back, my sweet boy. Ummmaaahhh 💋";

  noBtn.style.display = "none";
  cryEmoji.style.display = "none";
  threat.innerText = "";

  // 🔓 Reveal second photo after Yes
  const secondPhoto = document.getElementById("secondPhoto");
  setTimeout(() => {
    secondPhoto.classList.add("show");
  }, 800);

  // 🎆 Soft fireworks (already in your code)
  startFireworks();
});


/* 🎆 Soft Fireworks (stop after 5s) */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let animationId;

function startFireworks() {
  const startTime = Date.now();

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;

    for (let i = 0; i < 30; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        life: 60
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fill();

      if (p.life <= 0) particles.splice(i, 1);
    });

    if (Date.now() - startTime < 5000) {
      if (Math.random() < 0.05) createFirework();
      animationId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}



