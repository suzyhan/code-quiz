// Declare variables by referencing DOM elements
var headerEl = document.querySelector(".header");
var timeValue = document.getElementById("time-value");

var startQuizBtn = document.querySelector(".start-btn");
var startQuiz = document.getElementById("quiz");

var questionEl = document.getElementById("question-display");
var option1 = document.getElementById("btn1");
var option2 = document.getElementById("btn2");
var option3 = document.getElementById("btn3");
var option4 = document.getElementById("btn4");

var answerChoice = document.getElementById("answer-display");
var answer = document.getElementById("answer");
var showAnswer = document.querySelector(".show-answer");

var score = document.getElementById("score");
var scoreVal = document.getElementById("score-value");

var highscores = document.getElementById("highscores");

var currentIndex = 0;

// Define questions as an array of objects
const questions = [
    {
        question: "Commonly used date types Do Not include:",
        options: [
            "1. Strings",
            "2. Booleans",
            "3. Alerts",
            "4. Numbers",
        ],
        correctAnswer: 3, // Index of the correct answer in the 'options' array
    },
    {
        question: "What does HTML stand for?",
        options: [
            "1. Hyperlinks and Text Markup Language",
            "2. Hyper Text Markup Language",
            "3. Hyper Text Making Language",
            "4. Hyper Text Mark Language",
        ],
        correctAnswer: 2,
    },
    {
        question: "Which function is used to print text to the console in JavaScript?",
        options: [
            "1. log()", 
            "2. print()", 
            "3. console.log()", 
            "4. display()"
        ],
        correctAnswer: 3,
    },
    {
      question: "Which property is used to change the background color of an element in CSS?",
        options: [
            "1. background-color",
            "2. color-background",
            "3. bg-color",
            "4. background",
        ],
        correctAnswer: 1,
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "1. var",
            "2. let",
            "3. const",
            "4. All of the above",
        ],
        correctAnswer: 4,
    },
  ];

// Start the quiz
startQuizBtn.addEventListener("click", function() {
    startQuiz.classList.add("active");
    startTimer(); 
});

// Create function to start timer
var timeLeft = 60;
var timer;
function startTimer() {
timer = setInterval(() => {
    // Checks if the timer has reached zero seconds
    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timer);
    } else {
        timeLeft--; // Decrement time by 1 second
        timeValue.textContent = timeLeft;
    }
}, 1000); 
}; 

// Create function to load the current question with answer options
function loadQuestion() {
    questionEl.textContent = questions[currentIndex].question;
    option1.innerText = questions[currentIndex].options[0];
    option2.innerText = questions[currentIndex].options[1];
    option3.innerText = questions[currentIndex].options[2];
    option4.innerText = questions[currentIndex].options[3];
}

// Checking for correct loading of questions
console.log("Current Index:", currentIndex);
console.log("Question Text:", questions[currentIndex].question);

var shuffledQuestions = [];

// Create function to set a new quiz
function newQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentIndex = 0;
    loadQuestion();
    nextQuestion();
};

newQuiz();


// Create function to load next question
function nextQuestion() {
    if (timeLeft > 0 && currentIndex < shuffledQuestions.length) {
        loadQuestion(shuffledQuestions[currentIndex]);
    } else {
        displayScore();
    }
};

// Add event listener for answer options
answerChoice.addEventListener("click", function(event) {
    if (event.target.classList == "choice") {
        var userAnswer = event.target.textContent;
        console.log("userAnswer:", userAnswer);
        console.log("shuffledQuestions:", shuffledQuestions);
        var correctAnswerIndex = shuffledQuestions[currentIndex].correctAnswer;
        checkAnswer(userAnswer, correctAnswerIndex); // Pass the correct answer index as an argument
        currentIndex = currentIndex +1;
        nextQuestion();
    }
});

// Create function to check user answer against correct answer
function checkAnswer(userAnswer, correctAnswerIndex) {
    if (userAnswer === shuffledQuestions[currentIndex].options[correctAnswerIndex]) {
        answer.classList.add("active");
        showAnswer.textContent = "Correct!"
    } else {
        answer.classList.add("active");
        showAnswer.textContent = "Wrong!"
        timeLeft = timeLeft - 10; // Subtract 10 seconds from timer
    }
}; 