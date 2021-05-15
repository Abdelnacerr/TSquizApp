import "./App.scss";
import { useState } from "react";
import { fetchQuizQuestions } from "./API";

//components
import QuestionCard from "./components/QuestionCard";

//types
import { QuestionState, Difficulty } from "./API";

type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

const TOTALQ = 10;

const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	console.log(questions);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(TOTALQ, Difficulty.MEDIUM);
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			//Users answer
			const answer = e.currentTarget.value;
			//check value against correct answer
			const correct = questions[number].correct_answer === answer;

			//add score if correct
			if (correct) setScore((prev) => prev + 1);

			//save answer in array for userAnswers
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};
	const nextQuestion = () => {
		//move on to next question if not last Q
		const nextQuestion = number + 1;
		if (nextQuestion === TOTALQ) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<div className='App'>
			<h1> REACT QUIZ!</h1>

			{gameOver || userAnswers.length === TOTALQ ? (
				<button className='start' onClick={startTrivia}>
					{" "}
					Start{" "}
				</button>
			) : null}

			{!gameOver ? <p className='score'>Score</p> : null}
			{loading && <p>Loading Questions</p>}
			{!loading && !gameOver && (
				<QuestionCard
					questionNr={number + 1}
					question={questions[number].question}
					answers={questions[number].answers}
					callback={checkAnswer}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					totalQuestions={TOTALQ}
				/>
			)}

			{!loading &&
			!gameOver &&
			userAnswers.length === number + 1 &&
			number !== TOTALQ - 1 ? (
				<button className='next' onClick={nextQuestion}>
					Next
				</button>
			) : null}
		</div>
	);
};

export default App;
