import Question from "components/Question/Question";
import styles from "../styles/test0.module.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "features/auth/authSlice";
import { useGetNextQuestionMutation } from "features/question/questionApiSlice";
import {
  setNextQuestion,
  setNextQuestionReducer,
} from "features/question/questionSlice";
import { selectNextQuestion } from "features/question/questionSlice";
interface Question {
  questionText: string;
  //cdn man :ok:
  imageUrl: string;
  choices: string[];
  concepts: string[];
}

//should i define const functions outside of the funtion. realy makes no sense..
//them being inside component related to state probably ?
function Test0() {
  // const question = useSelector((state) => state.question.question);
  // const explanation = useSelector((state) => state.question.explanation);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getQuestionFetch());
  // }, [dispatch]);
  const [getNextQuestion, { isLoading }] = useGetNextQuestionMutation();
  const [nextQuestion, setNextQuestion] = useState({});

  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectNextQuestion);
  console.log("currentq", currentQuestion);

  // useLayoutEffect(() => {
  // }, [dispatch]);

  useEffect(() => {
    async function fetchNextQuestion() {
      try {
        const res = await getNextQuestion({}).unwrap();
        debugger;
        setNextQuestion(res);
        dispatch(setNextQuestionReducer(res));
      } catch (err) {
        if (!err?.originalStatus) {
          // isloading: true until timeout occurs
          console.log("No Server Response");
        } else if (err.originalStatus === 400) {
          console.log("Missing Username or Password");
        } else if (err.originalStatus === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }
    }
    fetchNextQuestion();
  }, [dispatch]);

  const handleSettingsButtonClick = () => {};
  return (
    <div className={styles.page}>
      <Question
        // concept={question.concepts}
        concepts={[
          "System Design",
          "Database Management",
          "Computer Science",
          "SQL",
        ]}
        // imageUrl={question.imageUrl}
        imageUrl="https://www.w3schools.com/howto/img_avatar2.png"
        // questionText={question.text}
        questionText={nextQuestion.questionText}
        // choices={question.choices}
        choices={nextQuestion.choices}
      />
      {
        <input
          type="button"
          className={styles.nextQuestionButton}
          value={"NEXT"}
          onClick={async (e) => {
            console.log("asdasds");
            e.preventDefault();
            const res = await getNextQuestion({}).unwrap();
            setNextQuestion(res);
          }}
        />
      }
      <Image
        className={styles.settingsIcon}
        src={"/settings-icon.png"}
        alt={"settings-icon"}
        width={50}
        height={50}
        onClick={handleSettingsButtonClick}
      />
    </div>
  );
}

export default Test0;
