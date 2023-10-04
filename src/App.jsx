import { useEffect, useReducer } from "react";
import { Header, Main, Loader, Error, Start, Question } from "./components";

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      return state;
  }
}

const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
        {status === "active" && <Question />}
      </Main>
    </div>
  );
};

export default App;
