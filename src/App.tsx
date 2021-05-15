import "./App.scss";
import { useState } from "react";
import { fetchQuizQuestions } from "./API";

//components
import QuestionCard from "./components/QuestionCard";

//types
import { Difficulty } from "./API";

const TOTALQ = 10;

const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	console.log(fetchQuizQuestions(TOTALQ, Difficulty.MEDIUM));

	const startTrivia = async () => {};
	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
	const nextQuestion = () => {};

	return (
		<div className='App'>
			<h1> REACT QUIZ!</h1>
			<button className='start' onClick={startTrivia}>
				Start
			</button>
			<p className='score'>Score</p>
			<p>Loading Questions</p>
			{/* <QuestionCard
				questionNr={number + 1}
				question={questions[number].question}
				answers={questions[number].answers}
				callback={checkAnswer}
				userAnswer={userAnswers ? userAnswers[number] : undefined}
				totalQuestions={TOTALQ}
			/> */}
			<button className='next' onClick={nextQuestion}>
				Next
			</button>
		</div>
	);
};

export default App;
