const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const threat = document.getElementById("threat");

let clickCount = 0;

const threats = [
  "Are you sure? 😠",
  "Think about it 🔪",
  "Last chance 😈"
];

yesBtn.addEventListener("click", () => {
  message.innerText =
    "wowwwwwwww... congratulations you're officially the luckiest man on this planet to be my valentine 💖✨ anyways love you to the moon and back my sweet boy.. ummmaaahhh 😘💋";
  
  threat.innerText = "";
  noBtn.style.display = "none";
});

noBtn.addEventListener("click", () => {
  if (clickCount < threats.length) {
    threat.innerText = threats[clickCount];
  }

  // Increase YES button size
  const currentSize = 1 + clickCount * 0.4;
  yesBtn.style.transform = `scale(${currentSize})`;

  clickCount++;

  // After last threat, hide NO button
  if (clickCount >= threats.length + 1) {
    noBtn.style.display = "none";
    yesBtn.style.transform = "scale(4)";
  }
});
