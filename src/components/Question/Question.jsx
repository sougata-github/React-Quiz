import { useQuiz } from "../../context/QuizContext";
import "./question.css";

const Question = () => {
  const { questions, index, answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;

  const question = questions[index];

  return (
    <section>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswered}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Question;
