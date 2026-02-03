document.addEventListener("DOMContentLoaded", () => {
  const yesButtons = document.querySelectorAll(".yesBtn");
  const finalMessage = document.getElementById("finalMessage");

  const messageText =
    "wowwwww you’re the most luckiest person ever in this solar system to be my valentine...anyways love you lots and lots..ummaaahhhh";

  function showMessage() {
    finalMessage.textContent = messageText;
    finalMessage.classList.remove("hidden");

    // Heart animation
    for (let i = 0; i < 35; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-10px";
      heart.style.fontSize = (16 + Math.random() * 18) + "px";
      heart.style.transition = "transform 3s linear";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.transform = "translateY(110vh)";
      }, 10);

      setTimeout(() => {
        heart.remove();
      }, 3000);
    }
  }

  yesButtons.forEach(button => {
    button.addEventListener("click", showMessage);
  });
});
