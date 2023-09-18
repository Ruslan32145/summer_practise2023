const questions = [
    {
        question: "Сколько спутников у Земли?",
        answers: [
        { text: "3", correct: false },
        { text: "24", correct: false },
        { text: "14", correct: false },
        { text: "1", correct: true },
        ]
    },
    {
        question: "Сколько минут в сутках?",
        answers: [
        { text: "720", correct: false },
        { text: "1440", correct: true },
        { text: "2160", correct: false },
        { text: "1380", correct: false },
        ]
    },
    {
        question: "Через пять лет какой будет год?",
        answers: [
        { text: "2022", correct: false },
        { text: "2023", correct: false },
        { text: "2028", correct: true },
        { text: "2027", correct: false },
    ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startTest() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


answerButtons.innerHTML = "";

currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});
}

function resetState() {
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Ты заработал ${score} очков!`;
    nextButton.innerHTML = "Начать заново";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startTest();
    }
});

startTest();