import { useEffect, useReducer } from "react";
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
} from "./components";

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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
    default:
      return state;
  }
}

const App = () => {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:3000/questions");
      const data = await response.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
      console.log(error);
    }
  }

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => question.points + acc,
    0
  );

  //load questions on mount.

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
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
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <Finish points={points} maxPoints={maxPoints} highscore={highscore} />
        )}
      </Main>
    </div>
  );
};

export default App;
