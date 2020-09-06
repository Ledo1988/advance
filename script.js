const buttonExercise = document.querySelectorAll('.button_exercise');
const mainBlock = document.querySelector('.exercise-out');
const buttonStep = document.querySelectorAll('.button-direction');

let step = 0;
let currentExercise = [];

buttonExercise.forEach(item => item.addEventListener('click', (event) => exerciseOpen(event)));
buttonStep.forEach(item => item.addEventListener('click', (event) => exerciseStep(event)));

document.addEventListener( "click", questionButtonListener );

function questionButtonListener(event){
	let element = event.target;
	if(element.classList.contains("question__button")){
		questionCheck();
	}
}


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

	let variantListHtml = getVariants();

	function getVariants() {
		let string = "";

		for (const [key, value] of Object.entries(variants)) {
			const correct = answer.find(answer => answer === key);

			if (correct !== undefined) {
				string = string + `<li class="question__item">
								<label class="question__label"> ${value}
								<input type="${type}" class="question__input" data-correct="true" name="group">
								<span class="question__checkmark"></span>
								</label>
								</li>`
			} else {
				string = string + `<li class="question__item">
								<label class="question__label"> ${value}
								<input type="${type}" class="question__input" name="group">
								<span class="question__checkmark"></span>
								</label>
								</li>`
			}
		}

		return string;
	}


	mainBlock.innerHTML = `<div class="question">
							<h1 class="question__title">Вопрос</h1>
							<h2 class="question__sub-title">${question.title}</h2>
							<ul class="question__list">${variantListHtml}</ul>
							<button type="button" class="question__button">Ответить</button>
							<p class="question__comment question__comment_error">Неверный ответ</p>
							<p class="question__comment question__comment_correct">Верный ответ. Нажмите далее</p>
							</div>`

	const firstInput = document.querySelectorAll('.question__input')[0];
	firstInput.checked = true;
}

function questionCheck() {
	const mainQuestion = document.querySelector('.question');

	let inputAll = document.querySelectorAll('.question__input');
	inputAll = Array.from(inputAll);
	const inputCheckedArray = inputAll.filter(item => item.checked);
	const inputCorrectArray = inputAll.filter(item => item.dataset.correct);
	const inputTrue = inputCheckedArray.map(item => item.dataset.correct ? true : "")

	if (inputCorrectArray.length === inputTrue.length && !inputTrue.includes('')) {
		mainQuestion.classList.add('question_correct');
		if (mainQuestion.classList.contains('question_error')) {
			mainQuestion.classList.remove('question_error')
		}
	} else {
		mainQuestion.classList.add('question_error');
		if (mainQuestion.classList.contains('question_correct')) {
			mainQuestion.classList.remove('question_correct')
		}
	}
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
