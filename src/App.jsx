import { useEffect } from "react";
import "./App.css";

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
import { useQuiz } from "./context/QuizContext";

const App = () => {
  const { getQuestions, status } = useQuiz();

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
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finished" && <Finish />}
      </Main>
    </div>
  );
};

export default App;
