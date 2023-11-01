import { useQuiz } from "../../context/QuizContext";
import "./start.css";

const Start = () => {
  const { dispatch, numQuestions } = useQuiz();

  return (
    <section className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </section>
  );
};

export default Start;
