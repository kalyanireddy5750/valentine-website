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
  const gifts = document.querySelectorAll(".gift-item");

  let currentGift = 0;

  // unlock first gift
  if (gifts.length) {
    gifts[0].classList.remove("locked");
    gifts[0].classList.add("active");
  }

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
    "Aakhri moka hai soch lo...mein murder nahii karnaa chaahthii aaj"
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
      message.innerText = `Yaaaaayyyyyyyyy!!!
Thank you sooo much for being my Valentine 🥰.
I’m officially the luckiest girl on this planet to have a cutuuuuu like you by my side (seriously, how did I get this lucky? 💗).
Love you to the moon and back, my sweet boy. Ummmaaahhh 😘
Pata hi nahi chala aap kab HAMAARI JAAN ban gaye…🥹`;
    }

    noBtn.style.display = "none";
    if (cryEmoji) cryEmoji.style.display = "none";
    if (threat) threat.innerText = "";

    fadeInMusic(bgMusic);
    startFireworks();

    if (openGiftsBtn) {
      openGiftsBtn.classList.remove("hidden");
      openGiftsBtn.onclick = () => {
        document.querySelector(".container").style.display = "none";

        if (bgMusic) {
          bgMusic.pause();
          bgMusic.currentTime = 0;
        }

        giftModal.classList.remove("hidden");
      };
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

  function pauseBgMusic() {
    if (bgMusic) bgMusic.pause();
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

  window.closeLetter = function () {
    letterModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    stopLetterMusic();
  };

  // ===============================
  // GIFTS
  // ===============================
  window.openGift = function (type) {
    const content = document.getElementById("giftContent");

    if (type === "quiz") {
      content.innerHTML = `
        <div class="quiz-box">
          <p class="quiz-title">Little quiz before your gift 😌</p>
          <p class="quiz-question">What do I love the most?</p>
          <div class="quiz-options">
            <button onclick="quizQ1('aaloo')">Aaloo Parotta 🥔</button>
            <button onclick="quizQ1('jalebi')">Jalebi 🍩</button>
            <button onclick="quizQ1('laddu')">Laddu 🍬</button>
            <button onclick="quizQ1('you')">You 💖</button>
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
      letterModal.classList.remove("hidden");
      playLetterMusic();
    }

    if (currentGift + 1 < gifts.length) {
      gifts[currentGift + 1].classList.remove("locked");
      gifts[currentGift + 1].classList.add("active");
    }
    currentGift++;
  };

  // ===============================
  // QUIZ
  // ===============================
  window.quizQ1 = function (answer) {
    const result = document.getElementById("quizResult");

    if (answer === "aaloo") {
      result.innerText = "Hmm 😋 tempting… but I don’t crave it the way I crave you.";
    }

    if (answer === "jalebi") {
      result.innerText = "Sweet choice 😌 but not sweeter than you.";
    }

    if (answer === "laddu") {
      result.innerText = "Closeee 😏 but still not the right answer.";
    }

    if (answer === "you") {
      result.innerText = "Correct 💗 Always you.\nFood is temporary. You are permanent.";
    }

    setTimeout(() => {
      quizNext();
    }, answer === "you" ? 2000 : 1200);
  };

  function quizNext() {
    const content = document.getElementById("giftContent");

    content.innerHTML = `
      <div class="quiz-box">
        <p class="quiz-title">Next question 😏</p>
        <p class="quiz-question"></p>
        <div class="quiz-options"></div>
        <p class="quiz-result"></p>
      </div>
    `;
  }

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
