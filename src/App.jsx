import { useEffect, useReducer } from "react";
<<<<<<< Updated upstream

import {
  Header,
  Main,
  Loader,
  Error,
  Start,
  Question,
  NextButton,
  ProgressBar,
  Finish,
  Timer,
} from "./components";
=======
import { Header, Main } from "./components";
>>>>>>> Stashed changes

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
<<<<<<< Updated upstream
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const timePerQuestion = 30;

=======
};

>>>>>>> Stashed changes
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
<<<<<<< Updated upstream
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * timePerQuestion,
      };
    case "newAnswer":
      const question = state.questions[state.index]; //current question
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
=======
>>>>>>> Stashed changes
    default:
      return state;
  }
}

const App = () => {
<<<<<<< Updated upstream
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function getQuestions() {
    try {
      const response = await fetch(
        "https://codingheroes.io/api-react-course-projects/questions.json"
      );
=======
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:3000/questions");
>>>>>>> Stashed changes
      const data = await response.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
      console.log(error);
    }
  }

<<<<<<< Updated upstream
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => question.points + acc,
    0
  );

=======
>>>>>>> Stashed changes
  //load questions on mount.

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
<<<<<<< Updated upstream
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
=======
        <p>1/15</p>
        <p>Questions?</p>
>>>>>>> Stashed changes
      </Main>
    </div>
  );
};

export default App;
