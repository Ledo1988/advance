const buttonExercise = document.querySelectorAll('.button_exercise');
const mainBlock = document.querySelector('.exercise-out');
const buttonStep = document.querySelectorAll('.button-direction');

let step = 0;
let currentExercise = [];

buttonExercise.forEach(item => item.addEventListener('click', (event) => exerciseOpen(event)))
buttonStep.forEach(item => item.addEventListener('click', (event) => exerciseStep(event)))

function exerciseOpen(event) {
	const button = event.target.closest('.button_exercise');
	currentExercise = currentExerciseCheck(parseInt(button.dataset.exercise));

	function currentExerciseCheck(number) {
		switch (number)
		{
			case 1:
				return exercise_1;
				break;
			case 2:
				return exercise_2;
				break;
			default:
				return false;
		}

	}

	exerciseView(currentExercise, step);

	return currentExercise;
}

function exerciseView(exercise, step) {
	const currentView = exercise[step];
	const currentItem = Object.keys(currentView)[0];

	switch (currentItem)
	{
		case 'video':
			showVideo(currentView);
			break;
		case 'article':
			showArticle(currentView);
			break;
		case 'text':
			showText(currentView);
			break;
		case 'question':
			showQuestion(currentView);
			break;
		default:
			return false;
	}

}

function showVideo(obj) {
	const videoLink = Object.values(obj)[0];

	mainBlock.innerHTML = `<div class="video">${videoLink}</div>`
}

function showArticle(obj) {
	const article = Object.values(obj)[0];

	mainBlock.innerHTML = `<div class="article">
<h1 class="article__title">${article.title}</h1>
<div class="article__text">${article.text}</div>
</div>`
}

function showText(obj) {
	const text = Object.values(obj)[0];

	mainBlock.innerHTML = `<div class="text">${text}</div>`
}

function showQuestion(obj) {
	const question = Object.values(obj)[0];
	const answer = question.varTrue;
	const variants = question.variables;
	let type = "radio";

	if (answer.length > 1) {
		type = "checkbox";
	}

	console.log(variants)



	mainBlock.innerHTML = `<div class="question">
<h1 class="question__title">Вопрос</h1>
<h2 class="question__sub-title">${question.title}</h2>
<div class="article__text"></div>
</div>`
}


function exerciseStep(event) {
	const button = event.target.closest('.button-direction');
	const buttonDirection = button.getAttribute('data-direction');

	if (buttonDirection === 'next') {
		step++;
		exerciseView(currentExercise, step);
	} else {
		step--;
		exerciseView(currentExercise, step);
	}

}