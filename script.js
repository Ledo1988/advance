const buttonExercise = document.querySelectorAll('.button_exercise');

buttonExercise.forEach(item => item.addEventListener('click', (event) => exerciseOpen(event)))

function exerciseOpen(event) {
	const button = event.target.closest('.button_exercise');

	const currentExercise = currentExerciseCheck(parseInt(button.dataset.exercise));

	function currentExerciseCheck(number) {
		if (number === 1) {
			return exercise_1;
		} else if (number === 2) {
			return exercise_2;
		}
	}

	exerciseView(currentExercise);
}

function exerciseView(exercise) {

}