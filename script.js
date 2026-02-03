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
  "Take a moment and think👿",
  "You might regret this🔪",
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
    "I knew it.\n\n wowwwwwwww... congratulations you're officially the luckiest man on this planet to be my Valentine.\nLove you to the moon and back, my sweet boy. Ummmaaahhh";

  noBtn.style.display = "none";
  cryEmoji.style.display = "none";
  threat.innerText = "";

  // 🔓 Reveal second photo after Yes
 const photoOverlay = document.getElementById("photoOverlay");

setTimeout(() => {
  photoOverlay.style.opacity = "1";
}, 600);

   // 🎵 Play music
 fadeInMusic(bgMusic);

  const giftSection = document.getElementById("giftSection");

setTimeout(() => {
  giftSection.classList.add("show");
}, 1800);

setTimeout(() => {
  document.getElementById("giftModal").classList.remove("hidden");
}, 5000);


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
  

  if (type === "memories") {
    content.innerHTML = `
      <p><strong>Our Memories 💕</strong></p>
      <img src="always.jpeg" style="width:70px;border-radius:10px;">
      <img src="forever.jpeg" style="width:70px;border-radius:10px;">
      <img src="sumo.jpeg" style="width:70px;border-radius:10px;">
    `;
  }

  if (type === "memories") {
  closeModal(); // close gift popup
  document.getElementById("memoryModal").classList.remove("hidden");
}


 if (type === "letter") {
  content.innerHTML = `
    <p><strong>Something I made just for you 🖤</strong></p>

    <iframe 
      src="Brown Illustrated Newspaper Trifold Brochure.pdf"
      style="
        width:100%;
        height:420px;
        border:none;
        border-radius:12px;
        margin-top:12px;
      ">
    </iframe>

    <p style="font-size:13px; margin-top:10px; opacity:0.7;">
      Take your time… scroll slowly 🙂
    </p>
  `;
}
  function closeMemory() {
  document.getElementById("memoryModal").classList.add("hidden");
}


















