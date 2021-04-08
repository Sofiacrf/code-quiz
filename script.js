var questions = [
  {
    title: "What is Javascript?",
    choices: [
      " is the standard markup language for creating Web pages ",
      " is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes",
      " is an interpreted, object-oriented, high-level programming language with dynamic semantics",
      " is the Programming Language of the Web",
    ],
    answer: "is the Programming Language of the Web",
  },

  {
    title: "What is a variable?",
    choices: [
      " Containers for storing data value ",
      " A random value",
      " Containers for storing numbers",
      " I don´t know",
    ],
    answer: "Containers for storing data value",
  },
  {
    title: "Where does the js.file should go in the HTML?",
    choices: ["head and body ", " head", " body", " header"],
    answer: "head and body",
  },

  {
    title: "What is an object?",
    choices: [
      " collection of properties ",
      " variable made of strings",
      " reusable blocks of code",
      " Acces of multiple elements",
    ],
    answer: "collection of properties",
  },
];

var quizQuestions = document.getElementById("each-question");
var quizChoices = document.getElementById("user-options");
var startBtn = document.getElementById("start");
var game = document.getElementById("game");
var finished = document.getElementById("finished-game");
var right = document.getElementById("right");
var wrong = document.getElementById("wrong");

var score = 100;
var thisQuestionIndex = 0;

// Create a function to start the quiz
function startQuiz() {
  var firstScreen = document.getElementById("begin");
  firstScreen.setAttribute("class", "hide");
  game.removeAttribute("class");

  showQuestions();
}

// Function that loads up the question
function showQuestions() {
  var thisQuestion = questions[thisQuestionIndex];
  var questionTitle = document.getElementById("each-question");
  questionTitle.textContent = thisQuestion.title;

  // Clear the page
  quizChoices.innerHTML = "";

  thisQuestion.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choiceButton");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.onclick = getNextQ; //on click to call the function that gets the next question

    quizChoices.appendChild(choiceButton);
  });
  //Call the set timer function
  setTime();
}

// Function that gets the next question
function getNextQ() {
  // resets the question and choices
  quizQuestions.innerHTML = "";
  quizChoices.innerHTML = "";

  // sets the next question
  showQuestions(thisQuestionIndex);
  thisQuestionIndex++;

  choiceMade();
}


// Function that handles when a choice is made
function choiceMade(e) {
  var selectedA = e;
  var correctA = questions.answer;
  var correctC = questions.choices;
  var setScore = document.getElementById("score");
  setScore.textContent = score;

  // If statement to evaluate the selected answer
  if (selectedA === correctA && selectedA === correctC) {
    score++;
    secondsLeft += 10;
    right.innerHTML = "That´s right!";
  } else {
    secondsLeft -= 10;
    score--;
    wrong.innerHTML = "Try again!";
  }
  restartQuiz();
}

// Function to restart the game
function restartQuiz() {
  // Hide the highscores and the restart button
  var restartScreen = document.getElementById("end");
  restartScreen.setAttribute("class", "hide");
  finished.removeAttribute("class");

  //Get the final scores
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = "Congrats! your final score is  " + score;

}

// Function that sets the timer
var timeEl = document.querySelector(".timeEl");
var secondsLeft = 10;

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// StartQuiz button
startBtn.onclick = startQuiz;
