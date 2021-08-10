import { Button, Card, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Questions from "./QuestionsStep";
import { useDataContext } from "./../../contexts/DataContext";
import { getAllQuestions } from "../../services/questions";

const MultiStepIndex = () => {
  const [questions, setQuestions] = useState([]);
  const { methods } = useDataContext();
  const [step, setStep] = useState(0);
  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const setAverage = () => {
    const sum = Object.values(watch()).reduce((accum, curr) => {
      if ([...Array(7).keys()].includes(parseInt(curr))) {
        return accum + parseInt(curr);
      } else {
        return accum;
      }
    }, 0);
    const average = (sum * 100) / (watch().tecToAsk.length * questions.length * 6);
    return average;
  };

  const completeFormStep = (num) => {
    console.log(watch());
    if (num === 1) {
      setStep((step) => step + 1);
    } else {
      setStep((step) => step - 1);
    }
  };

  const onAddNewInterview = (e) => {
    fetch(`http://localhost:8080/interviews`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(e),
    });
    console.log("added");
  };

  const onSubmit = async (data) => {
    const totalAverage = await setAverage();
    const date = new Date();
    const dateHour = date.getHours();
    const dateDay = date.getDate();
    const dateDayWeek = date.getDay();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    const newUser = {
      ...data,
      totalAverage: totalAverage,
      date: { dayWeek: dateDayWeek, day: dateDay, month: dateMonth, hour: dateHour, year: dateYear },
    };
    onAddNewInterview(newUser);
  };

  useEffect(() => {
    const getQuest = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
    };
    getQuest();
  }, []);

  const renderButton = () => {
    if (step > 1) {
      return (
        <>
          <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            Save
          </Button>
          <Button color="danger" onClick={() => completeFormStep(-1)}>
            Back
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="primary" onClick={() => completeFormStep(1)} disabled={!isValid}>
            Next
          </Button>
          <Button color="danger" onClick={() => completeFormStep(-1)}>
            Back
          </Button>
        </>
      );
    }
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <section className="text-start p-4">
            <Step1 />
          </section>
        )}
        {step === 1 && (
          <section>
            <Step2 />
          </section>
        )}
        {step === 2 && <Questions />}
      </Form>
      {renderButton()}
    </Card>
  );
};

export default MultiStepIndex;
