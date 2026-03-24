// QUESTIONS
const questions = [
  {
    question: "What does position: absolute do?",
    options: [
      "Positions relative to itself",
      "Positions relative to nearest positioned parent",
      "Fixes element to screen",
      "Hides element"
    ],
    answer: 1
  },
  {
    question: "What happens with overflow: hidden?",
    options: [
      "Content scrolls",
      "Content removed",
      "Extra content clipped",
      "Nothing happens"
    ],
    answer: 2
  },
  {
    question: "Which selector is used in checkbox hack?",
    options: [
     ":checked",
      ":active",
      ":hover",
      ":focus"
    ],
    answer: 0
  },
  {
    question: "Transform vs margin?",
    options: [
      "Both affect layout",
      "Transform affects layout",
      "No difference",
      "Margin affects layout, transform doesn’t",
    ],
    answer: 3
  },
  {
    question: "GPU handles best?",
    options: [
      "Width",
      "Transform & opacity",
      "Margin",
      "Font size"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selected = null;

// ELEMENTS
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");

const rulesDiv = document.getElementById("rules");
const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");

// EVENTS
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);

// START QUIZ
function startQuiz() {
  rulesDiv.style.display = "none";
  quizDiv.style.display = "block";
  loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
  selected = null;

  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];
  document.getElementById("question").innerText =
    `Q${currentQuestion + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      selected = index;

      // reset styles
      [...optionsDiv.children].forEach(b => b.style.background = "#eee");

      btn.style.background = "#ccc";
    };

    optionsDiv.appendChild(btn);
  });
}

// SUBMIT ANSWER
function submitAnswer() {
  if (selected === null) {
    alert("Select an option");
    return;
  }

  const correct = questions[currentQuestion].answer;
  const optionsDiv = document.getElementById("options");

  [...optionsDiv.children].forEach((btn, index) => {
    if (index === correct) {
      btn.style.background = "lightgreen";
    } else if (index === selected) {
      btn.style.background = "salmon";
    }

    btn.disabled = true;
  });

  if (selected === correct) score += 5;
  else score -= 1;

  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
}

// NEXT QUESTION
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// SHOW RESULT
function showResult() {
  quizDiv.style.display = "none";
  resultDiv.style.display = "block";

  const totalMarks = questions.length * 5;
  const percentage = (score / totalMarks) * 100;

  let message = "";

  if (percentage >= 80) message = "Strong fundamentals!";
  else if (percentage >= 40) message = "Good, revise a bit!";
  else message = "Need more practice!";

  resultDiv.innerHTML = `
    <h3>Your Score: ${score} / ${totalMarks}</h3>
    <p>${message}</p>
  `;
}