// Declare variables by referencing DOM elements
var timeValue = document.getElementById("time");

var startQuiz = document.getElementById("start");
var startQuizBtn = document.querySelector(".start-btn");

var questionEl= document.getElementById("question-display");
var option1 = document.getElementById("btn1");
var option2 = document.getElementById("btn2");
var option3 = document.getElementById("btn3");
var option4 = document.getElementById("btn4");

var answerChoice = document.getElementById("answer-display");
var answer = document.getElementById("answer");
var showAnswer = document.getElementById("show-answer");

var currentIndex;

// Define questions as an array of objects
const questions = [
    {
        question: "Commonly used date types DO Not Include:",
        options: [
            "1. Strings",
            "2. Booleans",
            "3. Alerts",
            "4. Numbers",
        ],
        answer: 3, // Index of the correct answer in the 'options' array
    },
    {
        question: "What does HTML stand for?",
        options: [
            "1. Hyperlinks and Text Markup Language",
            "2. Hyper Text Markup Language",
            "3. Hyper Text Making Language",
            "4. Hyper Text Mark Language",
        ],
        answer: 2,
    },
    {
        question: "Which function is used to print text to the console in JavaScript?",
        options: [
            "1. log()", 
            "2. print()", 
            "3. console.log()", 
            "4. display()"
        ],
        answer: 3,
    },
    {
      question: "Which property is used to change the background color of an element in CSS?",
        options: [
            "1. background-color",
            "2. color-background",
            "3. bg-color",
            "4. background",
        ],
        answer: 1,
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "1. var",
            "2. let",
            "3. const",
            "4. All of the above",
        ],
        answer: 4,
    },
  ];

