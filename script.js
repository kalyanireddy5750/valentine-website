document.addEventListener("DOMContentLoaded", () => {
  const yesButtons = document.querySelectorAll(".yesBtn");
  const msg = document.getElementById("finalMessage");

  const text =
    "wowwwww you’re the most luckiest person ever in this solar system to be my valentine...anyways love you lots and lots..ummaaahhhh";

  function celebrate() {
    msg.textContent = text;
    msg.classList.remove("hidden");

    // heart/confetti
    for (let i = 0; i < 36; i++) {
      const h = document.createElement("div");
      h.textContent = "💖";
      h.style.position = "fixed";
      h.style.left = Math.random() * 100 + "vw";
      h.style.top = "-10px";
      h.style.fontSize = (16 + Math.random() * 18) + "px";
      h.style.transition = "transform 3s linear";
      document.body.appendChild(h);
      setTimeout(() => h.style.transform = "translateY(110vh)", 10);
      setTimeout(() => h.remove(), 3000);
    }
  }

  yesButtons.forEach(btn => btn.addEventListener("click", celebrate));
});
