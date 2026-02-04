const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const threat = document.getElementById("threat");
const cryEmoji = document.getElementById("cryEmoji");
const bgMusic = document.getElementById("bgMusic");

let clickCount = 0;

const threats = [
  "Are you sure?",
  "Really sure...??? ☹️",
  "Take a moment and think 👿",
  "You might regret this 🔪",
  "Don't make me murder you donkey no.1"
];

/* ❌ NO button logic */
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

/* ❤️ YES button logic */
yesBtn.addEventListener("click", () => {
  message.innerText =
    "I knew it.\n\nwowwwwwwww... congratulations you're officially the luckiest man on this planet to be my Valentine.\nLove you to the moon and back, my sweet boy. Ummmaaahhh 💋";

  noBtn.style.display = "none";
  cryEmoji.style.display = "none";
  threat.innerText = "";

  // Background photo overlay
  const photoOverlay = document.getElementById("photoOverlay");
  setTimeout(() => {
    photoOverlay.style.opacity = "1";
  }, 600);

  // Music
  fadeInMusic(bgMusic);

  // Fireworks
  startFireworks();

  // Gift popup after 5 seconds
  setTimeout(() => {
    document.getElementById("giftModal").classList.remove("hidden");
  }, 5000);
});

/* 🎆 Fireworks */
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

/* 🎵 Music fade in */
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

/* 🎁 Gift popup controls */
function closeModal() {
  document.getElementById("giftModal").classList.add("hidden");
  document.getElementById("giftContent").innerHTML = "";
}

function openGift(type) {
  const content = document.getElementById("giftContent");

  if (type === "quiz") {
    content.innerHTML = `
      <p><strong>Quick question 😌</strong></p>
      <p>Who fell first?</p>
      <button onclick="answer('you')">You 😏</button>
      <button onclick="answer('me')">Me 🙈</button>
    `;
  }

 if (type === "letter") {
  content.innerHTML = `
    <p style="text-align:center; margin-bottom:12px;">
      <strong>Something I made just for you 🖤</strong>
    </p>

    <iframe 
      src="docs/Brown Illustrated Newspaper Trifold Brochure.pdf">
    </iframe>

    <p style="font-size:13px; margin-top:10px; opacity:0.7; text-align:center;">
      Scroll slowly… it’s meant to be read gently 🙂
    </p>
  `;
}


 if (type === "memories") {
  closeModal();
  document.body.style.overflow = "hidden";
  document.getElementById("memoryModal").classList.remove("hidden");
}


/* 🖼️ Memory popup close */
function closeMemory() {
  document.getElementById("memoryModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

/* Quiz answer */
function answer(choice) {
  const content = document.getElementById("giftContent");
  content.innerHTML =
    choice === "me"
      ? "Correct 💖 I fell first… and harder."
      : "Wrong 😌 But I still love you.";
}
let currentSong = null;

function playMemorySong(num) {
  if (currentSong) {
    currentSong.pause();
    currentSong.currentTime = 0;
  }

  currentSong = new Audio(`song${num}.mp3`);
  currentSong.volume = 0.6;
  currentSong.play();
}




