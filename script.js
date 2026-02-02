document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const message = document.getElementById("message");
  const buttons = document.querySelector(".buttons");

  const modal = document.getElementById("evilModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const trapBtns = document.querySelectorAll(".trapBtn");

  // --- NO button movement ---
  function moveNoButton() {
    const maxX = buttons.clientWidth - noBtn.offsetWidth;
    const maxY = buttons.clientHeight - noBtn.offsetHeight;
    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    openTrap();
  });

  // extra evil: if cursor gets close
  buttons.addEventListener("mousemove", (e) => {
    const r = noBtn.getBoundingClientRect();
    const d = Math.abs(e.clientX - r.left) + Math.abs(e.clientY - r.top);
    if (d < 140) moveNoButton();
  });

  // --- Trap modal logic ---
  let trapIndex = 0;
  const traps = [
    { t: "Hmm 🤔", m: "Overthinking detected. Try again 😌" },
    { t: "Aw 🙈", m: "Shy is cute… but YES is cuter 💖" },
    { t: "Later? 😅", m: "Later became now. Surprise!" },
    { t: "Plot twist 😈", m: "Every road leads to YES." }
  ];

  function openTrap() {
    modal.classList.remove("hidden");
    const cur = traps[trapIndex % traps.length];
    modalTitle.innerText = cur.t;
    modalText.innerText = cur.m;
    trapIndex++;
  }

  trapBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openTrap(); // loop forever
    });
  });

  // --- YES wins ---
  yesBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.querySelector(".container").innerHTML = `
      <h1>YAYYYY 💖🥰</h1>
      <p style="font-size:18px;margin-top:10px;">
        You just made the best choice today ✨<br>
        Officially my Valentine 💌
      </p>
    `;
  });
});
