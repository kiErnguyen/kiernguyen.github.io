const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is your BMI?",
        choice1: "0-15",
        choice2: "16-30",
        choice3: "30+",
        answer: 3,
    },
    {
        question: "Do you smoke?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "Do you drink alcohol?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "Have you had a stroke in the past?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To say",
        answer: 1,
    },
    {
        question: "Have you been having difficulty walking lately?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "What is your sex?",
        choice1: "Male",
        choice2: "Female",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "In which age range do you fall under?",
        choice1: "18-30",
        choice2: "31-60",
        choice3: "60+",
        answer: 3,
    },
    {
        question: "Are you diabetic?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "How would you describe your general health?",
        choice1: "Outstanding",
        choice2: "Good/ Very Good",
        choice3: "Poor/ Fair",
        answer: 3,
    },
    {
        question: "How many hours of sleep do you get on average?",
        choice1: "0-4",
        choice2: "4-8",
        choice3: "8+",
        answer: 1,
    },
    {
        question: "Do you have asthma?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "Do you have kidney disease?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    },
    {
        question: "Do you have or have you ever had skin cancer?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Prefer Not To Say",
        answer: 1,
    }
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 13

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()