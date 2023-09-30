// Declare variables by referencing DOM elements
var headerEl = document.querySelector(".header");
var timeValue = document.getElementById("time-value");

var startEl = document.getElementById("start");
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

var highscore = document.getElementById("highscore");
var highscoresEl = document.getElementById("highscores");

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
        answer: "3. Alerts" // Index of the correct answer in the 'options' array
    },
    {
        question: "What does HTML stand for?",
        options: [
            "1. Hyperlinks and Text Markup Language",
            "2. Hyper Text Markup Language",
            "3. Hyper Text Making Language",
            "4. Hyper Text Mark Language",
        ],
        answer: "2. Hyper Text Markup Language"
    },
    {
        question: "Which function is used to print text to the console in JavaScript?",
        options: [
            "1. log()", 
            "2. print()", 
            "3. console.log()", 
            "4. display()"
        ],
        answer: "3. console.log()"
    },
    {
      question: "Which property is used to change the background color of an element in CSS?",
        options: [
            "1. background-color",
            "2. color-background",
            "3. bg-color",
            "4. background",
        ],
        answer: "1. background-color"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "1. var",
            "2. let",
            "3. const",
            "4. All of the above",
        ],
        answer: "4. All of the above"
    }
  ];

// Start the quiz
startQuizBtn.addEventListener("click", function() {
    startQuiz.classList.add("active");
    startTimer(); 
    newQuiz();
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
    resetPage();
    questionEl.innerText = questions[currentIndex].question;
    option1.textContent = questions[currentIndex].options[0];
    option2.textContent = questions[currentIndex].options[1];
    option3.textContent = questions[currentIndex].options[2];
    option4.textContent = questions[currentIndex].options[3];
    correctAnswer = questions[currentIndex].answer;
}

var shuffledQuestions = [];

// Create function to set a new quiz
function newQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentIndex = 0;
    nextQuestion();
};

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
        var correctAnswer = shuffledQuestions[currentIndex].answer;
        checkAnswer(userAnswer, correctAnswer);
        currentIndex = currentIndex +1;
        nextQuestion();
    }
});

// Create function to check user answer against correct answer
function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
        answer.classList.add("active");
        showAnswer.textContent = "Correct!"
    } else {
        answer.classList.add("active");
        showAnswer.textContent = "Wrong!"
        timeLeft = timeLeft - 10; // Subtract 10 seconds from timer
    }
}; 

// Function to reset
function resetPage() {
    document.getElementById('answer-display').addEventListener('mouseleave', event => {
        if (event.target.classList != "choice") {
            answer.classList.remove("active");
        }
    });
}

// Function to display score when quiz is done
function displayScore() {
    clearInterval(timer);
    score.classList.add("active");
    if (timeLeft <= 0) {
        timeLeft = 0;
        scoreVal.innerText = timeLeft;
        timeValue.textContent = timeLeft;
    } else {
        scoreVal.innerText = timeLeft;
        timeValue.textContent = timeLeft;
    }
}

// Function to store the score/timeLeft in local storage
function storeData() {
    var newScore = timeLeft;
    var newInitial = document.querySelector('#initial').value;
    var newData = { score: newScore,
                    initial: newInitial};
                
    if (localStorage.getItem('highScores') == null) {
        highScores = [];
    } else {
        highScores = JSON.parse(localStorage.getItem('highScores'));
    }
    highScores.push(newData); // Add new data to high scores
    highScores.sort((a,b) => b.score - a.score); // Sort scores in descending order
    localStorage.setItem('highScores', JSON.stringify(highScores)); 
    displayHighScore();
}

// Function to display and view high scores
function displayHighScore() {
    highscore.classList.add("active");
    headerEl.classList.add("hide");
    startEl.classList.add("hide");
    if (localStorage.getItem('highScores') == null) {
        paraEl.innerText = "No high scores to display.";
    } else {
        var data = JSON.parse(localStorage.getItem('highScores')); 
        var highScoreData = "";
        for (let count = 0; count < data.length; count++) {
            displayNo = count + 1;
            highScoreData = highScoreData + "<br>" + displayNo + ". " + data[count].initial + " : " + data[count].score;
        }
        highscoresEl.innerHTML = highScoreData;
    }  
}

// Function to clear saved high scores
function clearData() {
    localStorage.clear();
    highscoresEl.innerText = "High scores cleared.";
}