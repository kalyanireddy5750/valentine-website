document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const message = document.getElementById("message");

  // NO button runs away
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 200;
    const y = Math.random() * 80;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // YES button reaction
  yesBtn.addEventListener("click", () => {
    message.innerText = "YAYYY 💖🥰 You just made my day!";
  });
});
