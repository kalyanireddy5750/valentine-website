document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const message = document.getElementById("message");
  const buttons = document.querySelector(".buttons");

  function moveNoButton() {
    const maxX = buttons.clientWidth - noBtn.offsetWidth;
    const maxY = buttons.clientHeight - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  // Run when mouse comes close OR tries to click
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mousedown", moveNoButton);

  // Extra safety: if cursor moves near it
  buttons.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const distance =
      Math.abs(e.clientX - rect.left) +
      Math.abs(e.clientY - rect.top);

    if (distance < 120) {
      moveNoButton();
    }
  });

  // YES button
  yesBtn.addEventListener("click", () => {
    message.innerText = "YAYYYY 💖🥰 You just made my day!";
  });
});
