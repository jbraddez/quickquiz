const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is not a programming language?",
        answers: [
            {text: "Python", correct: false},
            {text: "Ruby", correct: false},
            {text: "HTML", correct: true},
            {text: "Javascript", correct: false},
        ]
    },
    {
        question: "Which company does Elon Musk own?",
        answers: [
            {text: "Instagram", correct: false},
            {text: "SpaceX", correct: true},
            {text: "NASA", correct: false},
            {text: "Range Rover", correct: false},
        ]
    },
    {
        question: "Which car is a Porsche?",
        answers: [
            {text: "_ Focus RS", correct: false},
            {text: "_ Hurrican", correct: false},
            {text: "_ Purosangue", correct: false},
            {text: "_ 718 Spyder RS", correct: true},
        ]
    },
    {
        question: "Which is an IDE?",
        answers: [
            {text: "VS Code", correct: true},
            {text: "Microsoft Word", correct: false},
            {text: "Photoshop", correct: false},
            {text: "Slack", correct: false},
        ]
    }
    
];

const quesEl = document.getElementById('question');
const ansButs = document.getElementById('answer-buttons');
const nextBut = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBut.innerHTML = 'Next';
    showQuestion();
};

function showQuestion(){
    reset();
    let currentQuestion = questions[currentQuestionIndex];
    let questNo = currentQuestionIndex + 1;
    quesEl.innerHTML = questNo +". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn')
        ansButs.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
};

function reset(){
    nextBut.style.display = 'none';
    while (ansButs.firstChild){
        ansButs.removeChild(ansButs.firstChild);
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(ansButs.children).forEach(button => {
        if (button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBut.style.display = 'block';
};

function showScore() {
    reset();
    quesEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBut.innerHTML = 'Restart Quiz';
    nextBut.style.display = 'block';
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{showScore();}
};

nextBut.addEventListener('click',() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();

