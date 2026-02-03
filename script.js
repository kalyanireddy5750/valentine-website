document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const quizBox = document.getElementById("quiz");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const message = document.getElementById("message");

  const quiz = [
    {
      q: "How cute do you think we look together? 😌",
      options: ["Very cute", "Extremely cute", "Unfairly cute"]
    },
    {
      q: "What would our perfect date be? 💕",
      options: ["Long walk & talks", "Food + laughs", "All of the above"]
    },
    {
      q: "Do I make your days a little better? ☀️",
      options: ["Yes", "Obviously", "100% yes"]
    }
  ];

  let current = 0;

  function loadQuestion() {
    quizQuestion.innerText = quiz[current].q;
    quizOptions.innerHTML = "";

    quiz[current].options.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = nextQuestion;
      quizOptions.appendChild(btn);
    });
  }

  function nextQuestion() {
    current++;
    if (current < quiz.length) {
      loadQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    quizBox.innerHTML = `
      <h2>One last question… 💖</h2>
      <p>Will you be my Valentine? 💌</p>
      <button id="finalYes">YES 😍</button>
    `;

    document.getElementById("finalYes").onclick = () => {
      quizBox.innerHTML = `
        <h1>YAYYYYY 💖🥰</h1>
        <p>You just made me really really happy 💕</p>
      `;
    };
  }

  yesBtn.addEventListener("click", () => {
    yesBtn.style.display = "none";   // optional
    quizBox.classList.remove("hidden");
    loadQuestion();
  });
});
