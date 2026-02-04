document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ELEMENTS
  // ===============================
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const message = document.getElementById("message");
  const threat = document.getElementById("threat");
  const cryEmoji = document.getElementById("cryEmoji");
  const bgMusic = document.getElementById("bgMusic");
  const giftModal = document.getElementById("giftModal");
  const memoryModal = document.getElementById("memoryModal");

  if (!yesBtn || !noBtn) return;

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
    startFireworks();
document.getElementById("openGiftsBtn").classList.remove("hidden");

document.getElementById("openGiftsBtn").onclick = () => {
  giftModal.classList.remove("hidden");
};

    
  });

  // ===============================
  // FIREWORKS
  // ===============================
  const canvas = document.getElementById("confetti");
  const ctx = canvas ? canvas.getContext("2d") : null;

  if (ctx) {
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
  // MUSIC
  // ===============================
  function fadeInMusic(audio) {
    if (!audio) return;

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
  window.closeModal = function () {
    giftModal.classList.add("hidden");
    document.getElementById("giftContent").innerHTML = "";
  };

  window.closeMemory = function () {
    memoryModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  };

  // ===============================
  // GIFTS
  // ===============================
  window.openGift = function (type) {
    const content = document.getElementById("giftContent");

    if (type === "quiz") {
  content.innerHTML = `
    <div class="quiz-box">
      <p class="quiz-title">Tiny quiz before your gift 😌</p>
      <p class="quiz-question">Who fell first?</p>

      <div class="quiz-options">
        <button onclick="quizStep1('you')">You 😏</button>
        <button onclick="quizStep1('me')">Me 🙈</button>
      </div>

      <p id="quizResult" class="quiz-result"></p>
    </div>
  `;
}


    if (type === "memories") {
      closeModal();
      document.body.style.overflow = "hidden";
      memoryModal.classList.remove("hidden");
    }
    if (type === "letter") {
  closeModal();
  document.body.style.overflow = "hidden";
  document.getElementById("letterModal").classList.remove("hidden");
}


   
     

  // ===============================
  // QUIZ ANSWER
  // ===============================
  window.quizAnswer = function (choice) {
    const result = document.getElementById("quizResult");
    result.innerText =
      choice === "me"
        ? "Correct 💗 I fell first… and I still fall every day."
        : "Haha 😌 maybe… but I definitely fell harder.";
  };

  // ===============================
  // MEMORY SONGS
  // ===============================
  let currentSong = null;

  window.playMemorySong = function (num) {
    if (currentSong) {
      currentSong.pause();
      currentSong.currentTime = 0;
    }

    currentSong = new Audio(`songs/song${num}.mp3`);
    currentSong.volume = 0.6;
    currentSong.play();
  };

});
window.closeLetter = function () {
  document.getElementById("letterModal").classList.add("hidden");
  document.body.style.overflow = "auto";
};
  window.quizStep1 = function (choice) {
  const result = document.getElementById("quizResult");

  result.innerText =
    choice === "me"
      ? "Correct 💗 I fell first… and I still fall every day."
      : "Haha 😌 maybe… but I fell harder.";

  setTimeout(() => {
    result.innerHTML += `
      <br><br>
      <strong>Next question 😏</strong><br>
      What do I love most about you?<br><br>

      <button onclick="quizEnd()">Everything 💕</button>
      <button onclick="quizEnd()">Your smile 😌</button>
    `;
  }, 1200);
};

window.quizEnd = function () {
  document.getElementById("quizResult").innerHTML =
    "Correct 💖 The answer is always… YOU. Always you.";
};




