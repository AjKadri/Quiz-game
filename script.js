const questions = [
	{
		question: "What is 2 + 2?",
		answers: ["1", "2", "3", "4"],
		correct: 3,
	},
	{
		question: "What is the capital of Canada?",
		answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
		correct: 2,
	},
	{
		question: "Which language runs in the browser?",
		answers: ["Python", "Java", "JavaScript", "C++"],
		correct: 2,
	},
	{
		question: "Which weighs more: 1kg of iron or 1kg of feathers?",
		answers: ["Iron", "Feathers", "They weigh the same", "Depends on gravity"],
		correct: 2,
	},
	{
		question:
			"If a plane crashes on the border of the US and Canada, where do they bury the survivors?",
		answers: ["USA", "Canada", "Both countries", "You don't bury survivors"],
		correct: 3,
	},
	{
		question: "Who painted the Mona Lisa?",
		answers: [
			"Vincent van Gogh",
			"Leonardo da Vinci",
			"Pablo Picasso",
			"Michelangelo",
		],
		correct: 1,
	},
	{
		question: "Which country has the largest population in the world?",
		answers: ["India", "United States", "China", "Indonesia"],
		correct: 0,
	},
	{
		question:
			"Some months have 31 days, others have 30. How many have 28 days?",
		answers: ["1", "6", "12", "2"],
		correct: 2,
	},
	{
		question:
			"If you pass the person in second place in a race, what position are you in?",
		answers: ["First", "Second", "Third", "Last"],
		correct: 1,
	},
	{
		question: "What is the chemical symbol for gold?",
		answers: ["Ag", "Au", "Gd", "Go"],
		correct: 1,
	},
	{
		question: "Which gas do plants absorb from the atmosphere?",
		answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
		correct: 2,
	},
	{
		question: "What is the smallest prime number?",
		answers: ["0", "1", "2", "3"],
		correct: 2,
	},
	{
		question: "What is the hardest natural substance on Earth?",
		answers: ["Iron", "Diamond", "Quartz", "Granite"],
		correct: 1,
	},
	{
		question: "Which country hosted the first modern Olympic Games in 1896?",
		answers: ["France", "Italy", "Greece", "Germany"],
		correct: 2,
	},
	{
		question: "Who developed the theory of relativity?",
		answers: [
			"Isaac Newton",
			"Albert Einstein",
			"Nikola Tesla",
			"Galileo Galilei",
		],
		correct: 1,
	},
];

let currentQuestion = 0;
let score = 0;
// let level = 0;

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("retry-btn").addEventListener("click", restartQuiz);

function startQuiz() {
	document.getElementById("start-btn").style.display = "none";
	document.getElementById("question-container").style.display = "block";
	document.querySelector(".instruction").style.display = "none";
	showQuestion();
}

function showQuestion() {
	// level++
	document.getElementById("level").textContent =
		`Question ${currentQuestion + 1}`; // replaced level with currentQuestion since it also increase by 1
	const questionElement = document.getElementById("question");
	const answerButtons = document.getElementById("answer-buttons");

	questionElement.textContent = questions[currentQuestion].question;
	answerButtons.innerHTML = "";

	questions[currentQuestion].answers.forEach((answer, index) => {
		const button = document.createElement("button");
		button.textContent = answer;
		button.classList.add("btn");
		button.addEventListener("click", () => selectAnswer(index));
		answerButtons.appendChild(button);
	});
}

function selectAnswer(index) {
	if (index === questions[currentQuestion].correct) {
		score++;
	}
	currentQuestion++;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		showResults();
	}
}

function showResults() {
	document.getElementById("level").style.display = "none";
	document.getElementById("question").textContent =
		`Your Score: ${score} / ${questions.length}`;
	document.getElementById("question").classList.add("bold");
	let message;
	if (score === questions.length) {
		message = "You got a perfect score!";
	} else if (score > questions.length * 0.7) {
		message = "Great job but a perfect score is better!";
	} else {
		message = "That's not too good. Try again!";
	}
	document.getElementById("answer-buttons").innerHTML = `<h3>${message}</h3>`;
	document.getElementById("retry-btn").style.display = "flex";
}

function restartQuiz() {
	document.getElementById("retry-btn").style.display = "none";
	document.getElementById("answer-buttons").style.display = "grid";
	document.getElementById("question").classList.remove("bold");
	// level = 0;
	score = 0;
	currentQuestion = 0;
	document.getElementById("level").style.display = "flex";
    shuffleQuestions(questions);
	showQuestion();
}

function shuffleQuestions(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}