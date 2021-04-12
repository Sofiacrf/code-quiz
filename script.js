var questions = [
  {
    title: "What is Javascript?",
    choices: [
      "Is the standard markup language for creating Web pages",
      "Is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes",
      "Is an interpreted, object-oriented, high-level programming language with dynamic semantics",
      "Is the Programming Language of the Web",
    ],
    answer: "Is the Programming Language of the Web",
  },

  {
    title: "What is a variable?",
    choices: [
      "Containers for storing data value",
      "A random value",
      "Containers for storing numbers",
      "I don´t know",
    ],
    answer: "Containers for storing data value",
  },
  {
    title: "Where does the js.file should go in the HTML?",
    choices: ["Head and body", "Head", "Body", "Header"],
    answer: "Head and body",
  },

  {
    title: "What is an object?",
    choices: [
      "Collection of properties",
      "Variable made of strings",
      "Reusable blocks of code",
      "Acces of multiple elements",
    ],
    answer: "Collection of properties",
  },
];

var quizQuestions = document.getElementById("each-question");
var quizChoices = document.getElementById("user-options");
var startBtn = document.getElementById("start");
var game = document.getElementById("game");
var finished = document.getElementById("finished-game");
var right = document.getElementById("right");
var wrong = document.getElementById("wrong");
var setScore = document.getElementById("score");
var restart = document.getElementById("restart");
var restartScreen = document.getElementById("end");
var beginScreen = document.getElementById("begin");
var timeEl = document.querySelector(".timeEl");

var score = 100;
var secondsLeft = 10;
var thisQuestionIndex = 0;
var questionsLength = questions.length;

// Create a function to start the quiz
function startQuiz() {
  var firstScreen = document.getElementById("begin");
  firstScreen.setAttribute("class", "hide");
  game.removeAttribute("class");

  showQuestions();

  //Call the set timer function
  setTime();
}

// Function that loads up the question
function showQuestions() {
  var thisQuestion = questions[thisQuestionIndex];
  var questionTitle = document.getElementById("each-question");
  questionTitle.textContent = thisQuestion.title;

  // Clear the page
  quizChoices.innerHTML = "";

  setScore.textContent = score;

  thisQuestion.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choiceButton");
    choiceButton.setAttribute("value", choice);

    // choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.textContent = choice;
    choiceButton.onclick = getNextQ; //on click to call the function that gets the next question

    quizChoices.appendChild(choiceButton);
  });

}

// Function that gets the next question
function getNextQ(e) {
  // resets the question and choices
  var buttonValue = e.target.value;
  quizQuestions.innerHTML = "";
  quizChoices.innerHTML = "";

  // sets the next question
  thisQuestionIndex++;
  if(thisQuestionIndex !== questionsLength){
    showQuestions(thisQuestionIndex);
    choiceMade(thisQuestionIndex, buttonValue);
  } else {
    restartQuiz();
  }
}

// Function that handles when a choice is made
function choiceMade(nextQuestionIndex, buttonValue) {
  var correctA = questions[nextQuestionIndex - 1].answer;
  var correctC = buttonValue;

  // If statement to evaluate the selected answer
  if (correctA === correctC) {
    score++;
    secondsLeft += 3;
    right.innerHTML = "That´s right!";
  } else {
    secondsLeft -= 3;
    score--;
    right.innerHTML = "Try again!";
  }
  setScore.textContent = score;
}

// Function to restart the game
function restartQuiz() {
  // Hide the highscores and the restart button
  game.style.display = "none";
  restartScreen.style.display = "flex";

  //Get the final scores
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = "Congrats! your final score is  " + score;

}

restart.addEventListener("click", () => {
  let initials = document.querySelector('.inputInitials').value;
  let scoreHistory = JSON.parse(localStorage.getItem("scores")) || [];
  let initialsScore = {
    initials: initials,
    score: score
  };
  scoreHistory.push(initialsScore);
  localStorage.setItem("scores", JSON.stringify(scoreHistory));
  window.location.href = "index.html"
})

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if(thisQuestionIndex === questionsLength) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// StartQuiz button
startBtn.onclick = startQuiz;
