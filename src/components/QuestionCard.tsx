import React from "react";
import "../App.scss";

type Props = {
	question: string;
	answers: string[];
	callback: any;
	userAnswer: any;
	questionNr: number;
	totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => {
	return (
		<div className='container'>
			<p className='number'>
				Question: {questionNr} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }}></p>
			<div>
				{answers.map((answer) => (
					<div key={answer}>
						<button
							className='multiple'
							disabled={!!userAnswer}
							value={answer}
							onClick={callback}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
