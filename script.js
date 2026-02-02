document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const message = document.getElementById("message");
  const buttons = document.querySelector(".buttons");

  function moveNoButton() {
    const containerWidth = buttons.offsetWidth - noBtn.offsetWidth;
    const containerHeight = buttons.offsetHeight - noBtn.offsetHeight;

    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  // NO button runs on hover AND click
  noBtn.addEventListener("mouseover", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);

  // YES button works normally
  yesBtn.addEventListener("click", () => {
    message.innerText = "YAYYYY 💖🥰 You just made my day!";
  });
});
