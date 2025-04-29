/* ------------ Age Calculator ------------ */
function calculateAge() {
    const year = Number(document.getElementById('birth-year').value);
    const now = new Date().getFullYear();
    const result = document.getElementById('age-result');
    if (!year || year > now || year < 1900) {
        result.textContent = "Please enter a valid year (1900 - " + now + ")";
    } else {
        result.textContent = "Your age is " + (now - year) + " years.";
    }
}

/* ------------ Simple Quiz App ------------ */
const quizQuestions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "2 + 2 equals?",
        choices: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What language runs in a web browser?",
        choices: ["Python", "Java", "C++", "JavaScript"],
        answer: 3
    }
];

let quizIndex = 0;
let quizScore = 0;

function showQuizQuestion() {
    if (quizIndex >= quizQuestions.length) {
        document.getElementById('quiz-question').textContent = "Quiz Finished!";
        document.getElementById('quiz-choices').innerHTML = "";
        document.getElementById('next-question').style.display = "none";
        document.getElementById('quiz-result').textContent = "Your score: " + quizScore + "/" + quizQuestions.length;
        return;
    }
    const q = quizQuestions[quizIndex];
    document.getElementById('quiz-question').textContent = q.question;
    const choicesDiv = document.getElementById('quiz-choices');
    choicesDiv.innerHTML = "";
    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = function() {
            if (idx === q.answer) quizScore += 1;
            document.getElementById('next-question').style.display = "inline-block";
            Array.from(choicesDiv.children).forEach(child => child.disabled = true);
        };
        choicesDiv.appendChild(btn);
    });
    document.getElementById('next-question').style.display = "none";
    document.getElementById('quiz-result').textContent = "";
}

function nextQuizQuestion() {
    quizIndex += 1;
    showQuizQuestion();
}

// Initialize quiz on load
window.addEventListener('DOMContentLoaded', showQuizQuestion);

/* ------------ To-Do List Manager ------------ */
function addTask() {
    const input = document.getElementById('todo-input');
    const tasksUl = document.getElementById('tasks');
    const taskText = input.value.trim();
    if (!taskText) return;
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Mark as done
    span.onclick = function() {
        li.classList.toggle('done');
    };
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.onclick = function() {
        tasksUl.removeChild(li);
    };
    li.appendChild(delBtn);
    tasksUl.appendChild(li);
    input.value = '';
}

/* ------------ Number Guessing Game ------------ */
let randomNumber = null;
let guessAttempts = 0;

function startGuessingGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessAttempts = 0;
    document.getElementById('guess-area').style.display = 'block';
    document.getElementById('guess-result').textContent = '';
    document.getElementById('guess-input').value = '';
}

function submitGuess() {
    const guess = Number(document.getElementById('guess-input').value);
    const resultDiv = document.getElementById('guess-result');
    if (!randomNumber) {
        resultDiv.textContent = "Start a new game first!";
        return;
    }
    if (!guess || guess < 1 || guess > 100) {
        resultDiv.textContent = "Please enter a guess between 1 and 100.";
        return;
    }
    guessAttempts += 1;
    if (guess === randomNumber) {
        resultDiv.textContent = `Congratulations! You guessed it in ${guessAttempts} attempt(s)!`;
        randomNumber = null;
    } else if (guess < randomNumber) {
        resultDiv.textContent = "Too low. Try again!";
    } else {
        resultDiv.textContent = "Too high. Try again!";
    }
}