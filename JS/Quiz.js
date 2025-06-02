// Get DOM elements
const questionNumber = document.getElementById('question-number');
const statement = document.getElementById('statement');
const optionButtons = document.querySelector('#options');
const explanation = document.getElementById('explanation');
const nextButton = document.getElementById('next');

// Array of quiz questions
const questions = [
    {
        statement: "Arrays are like objects",
        answer: true,
        explanation: "Arrays are a kind of object with special properties."
    },
    {
        statement: "JavaScript is a statically typed language",
        answer: false,
        explanation: "JavaScript is dynamically typed."
    },
    {
        statement: "The 'this' keyword in JavaScript always refers to the global object",
        answer: false,
        explanation: "The value of 'this' depends on how the function is called."
    }
];

// Initialize quiz state
let currentQuestionIndex = 0;
let score = 0;

// Function to disable a button
const disable = (button) => {
    button.setAttribute('disabled', '');
};

// Function to enable a button
const enable = (button) => {
    button.removeAttribute('disabled');
};

// Function to check if the guess is correct
function isCorrect(guessString) {
    const guess = guessString === 'true';
    return guess === questions[currentQuestionIndex].answer;
}

// Function to display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    statement.textContent = currentQuestion.statement;
    explanation.textContent = '';
    for (let button of optionButtons.children) {
        enable(button);
        button.classList.remove('correct', 'incorrect');
    }
    nextButton.style.display = 'none';
}

// Add event listeners to option buttons
for (let button of optionButtons.children) {
    button.addEventListener('click', (event) => {
        const guessedValue = event.target.value;
        const currentQuestion = questions[currentQuestionIndex];
        explanation.textContent = currentQuestion.explanation;
        for (let btn of optionButtons.children) {
            disable(btn);
        }
        if (isCorrect(guessedValue)) {
            score++;
            event.target.classList.add('correct');
        } else {
            event.target.classList.add('incorrect');
        }
        nextButton.style.display = 'block';
    });
}

// Add event listener to the next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        questionNumber.textContent = '';
        statement.textContent = `Quiz completed! Your score is ${score} out of ${questions.length}.`;
        optionButtons.style.display = 'none';
        explanation.textContent = '';
        nextButton.style.display = 'none';
    }
});

// Start the quiz by displaying the first question
displayQuestion();
