// Quiz data
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
// Selecting HTML elements
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultsContainer = document.getElementById("results");
const scoreElement = document.getElementById("score");
// Initial state
startBtn.classList.remove("hide");
nextBtn.classList.add("hide");
resultsContainer.classList.add("hide");

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextButton);

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  resultsContainer.classList.add("hide");
  showQuestion();
}

// Function to show the current question
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
// Function to reset the state of the quiz
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
// Function to handle answer selection
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    showResults();
  }
}
// Function to show the results
function showResults() {
  questionContainer.classList.add("hide");
  resultsContainer.classList.remove("hide");
  scoreElement.innerText = `Score: ${score}/${questions.length}`;
}
// Function to handle the next button click
function handleNextButton() {
  currentQuestionIndex++;
  showQuestion();
}
