import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const timePerQuestion = 30;

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
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
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return initialState;
  }
}

const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function getQuestions() {
    try {
      const response = await fetch(
        "https://codingheroes.io/api-react-course-projects/questions.json"
      );
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

  return (
    <QuizContext.Provider
      value={{
        questions,
        answer,
        status,
        points,
        index,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
        getQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Cannot use context outside provider");
  }
  return context;
}
