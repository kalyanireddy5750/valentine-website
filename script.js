const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 250;
  const y = Math.random() * 80;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

yesBtn.addEventListener("click", () => {
  message.innerHTML = "YAYYYY!! 💖🥰 You just made my day 💕";
});

