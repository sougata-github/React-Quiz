import { useQuiz } from "../../context/QuizContext";
import "./progress.css";

const ProgressBar = () => {
  const { index, points, answer, numQuestions, maxPoints } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
