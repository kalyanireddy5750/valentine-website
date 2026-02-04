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
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ===============================
// MUSIC FADE IN
// ===============================
function fadeInMusic(audio) {
  audio.volume = 0;
  audio.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.4) {
      vol += 0.02;
      audio.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

// ===============================
// MODALS
// ===============================
function closeModal() {
  document.getElementById("giftModal").classList.add("hidden");
  document.getElementById("giftContent").innerHTML = "";
}

function closeMemory() {
  document.getElementById("memoryModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ===============================
// GIFTS
// ===============================
function openGift(type) {
  const content = document.getElementById("giftContent");

  // 🎁 GIFT 1 – QUIZ
  if (type === "quiz") {
    content.innerHTML = `
      <div class="quiz-box">
        <p class="quiz-title">Quick question 😌</p>
        <p class="quiz-question">Who fell first?</p>

        <div class="quiz-options">
          <button onclick="quizAnswer('you')">You 😏</button>
          <button onclick="quizAnswer('me')">Me 🙈</button>
        </div>

        <p id="quizResult" class="quiz-result"></p>
      </div>
    `;
  }

  // 🎁 GIFT 2 – MEMORIES
  if (type === "memories") {
    closeModal();
    document.body.style.overflow = "hidden";
    document.getElementById("memoryModal").classList.remove("hidden");
  }

  // 🎁 GIFT 3 – LETTER
  if (type === "letter") {
    content.innerHTML = `
      <p style="text-align:center; margin-bottom:12px;">
        <strong>Something I made just for you 🖤</strong>
      </p>

      <iframe src="docs/Brown Illustrated Newspaper Trifold Brochure.pdf"></iframe>

      <p style="font-size:13px; margin-top:10px; opacity:0.7; text-align:center;">
        Scroll slowly… it’s meant to be read gently 🙂
      </p>
    `;
  }
}

// ===============================
// QUIZ ANSWER
// ===============================
function quizAnswer(choice) {
  const result = document.getElementById("quizResult");

  if (choice === "me") {
    result.innerText =
      "Correct 💗 I fell first… and I still fall for you every single day.";
  } else {
    result.innerText =
      "Haha 😌 maybe… but I definitely fell harder.";
  }
}

// ===============================
// MEMORY SONGS
// ===============================
let currentSong = null;

function playMemorySong(num) {
  if (currentSong) {
    currentSong.pause();
    currentSong.currentTime = 0;
  }

  currentSong = new Audio(`songs/song${num}.mp3`);
  currentSong.volume = 0.6;
  currentSong.play();
}
