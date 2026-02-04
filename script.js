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
  const letterModal = document.getElementById("letterModal");
  const openGiftsBtn = document.getElementById("openGiftsBtn");
  const letterMusic = document.getElementById("letterMusic");

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
    if (cryEmoji) cryEmoji.style.display = "block";

    if (clickCount < threats.length && threat) {
      threat.innerText = threats[clickCount];
    }

    yesBtn.style.transform = `scale(${1 + clickCount * 0.4})`;
    clickCount++;

    if (clickCount > threats.length) {
      noBtn.style.display = "none";
    }
  });

  // ===============================
  // YES BUTTON
  // ===============================
  yesBtn.addEventListener("click", () => {
    if (message) {
      message.innerText =
        "I knew it.\n\nCongratulations… you’re officially the luckiest man on this planet to be my Valentine.\nLove you to the moon and back, my sweet boy. Ummmaaahhh 💗";
    }

    noBtn.style.display = "none";
    if (cryEmoji) cryEmoji.style.display = "none";
    if (threat) threat.innerText = "";

    fadeInMusic(bgMusic);
    startFireworks();

    if (openGiftsBtn && giftModal) {
      openGiftsBtn.classList.remove("hidden");
      openGiftsBtn.onclick = () => giftModal.classList.remove("hidden");
    }
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
    if (giftModal) giftModal.classList.add("hidden");
    const giftContent = document.getElementById("giftContent");
    if (giftContent) giftContent.innerHTML = "";
  };

  window.closeMemory = function () {
    if (memoryModal) memoryModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  };

  window.closeLetter = function () {
    if (letterModal) letterModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    stopLetterMusic();
  };

  // ===============================
  // GIFTS
  // ===============================
  window.openGift = function (type) {
    const content = document.getElementById("giftContent");
    if (!content) return;

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

    if (type === "memories" && memoryModal) {
      closeModal();
      document.body.style.overflow = "hidden";
      memoryModal.classList.remove("hidden");
    }

    if (type === "letter" && letterModal) {
      closeModal();
      document.body.style.overflow = "hidden";
      letterModal.classList.remove("hidden");
      playLetterMusic();
    }
  };

  // ===============================
  // QUIZ
  // ===============================
  window.quizStep1 = function (choice) {
    const result = document.getElementById("quizResult");
    if (!result) return;

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
    const result = document.getElementById("quizResult");
    if (result) {
      result.innerHTML =
        "Correct 💖 The answer is always… YOU. Always you.";
    }
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

  // ===============================
  // LETTER MUSIC
  // ===============================
  function playLetterMusic() {
    if (!letterMusic) return;
    letterMusic.volume = 0.5;
    letterMusic.currentTime = 0;
    letterMusic.play();
  }

  function stopLetterMusic() {
    if (!letterMusic) return;
    letterMusic.pause();
    letterMusic.currentTime = 0;
  }

});
