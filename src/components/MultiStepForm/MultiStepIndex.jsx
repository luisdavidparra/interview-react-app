import { Button, Card, CardBody, CardTitle, Col, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Questions from "./QuestionsStep";
import { useDataContext } from "./../../contexts/DataContext";
import { getAllQuestions } from "../../services/questions";
import { Link } from "react-router-dom";

const MultiStepIndex = () => {
  const [questions, setQuestions] = useState([]);
  const { methods } = useDataContext();
  const [step, setStep] = useState(0);
  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = methods;
  const [isDone, setIsDone] = useState(false);

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
    setIsDone(true)
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
          <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={!isValid} className="m-3">
            Save
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="primary" onClick={() => completeFormStep(1)} disabled={!isValid} className="mb-3 mx-3">
            Next
          </Button>
        </>
      );
    }
  };

  return (
    <>
      {!isDone ? (
        <Card>
          <>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {step === 0 && (
                <section className="text-start p-4">
                  <Step1 />
                </section>
              )}
              {step === 1 && (
                <section className="text-start p-4">
                  <Step2 />
                </section>
              )}
              {step === 2 && <Questions />}
            </Form>
            {renderButton()}
          </>
        </Card>
      ) : (
        <>
          <Col sm="6" className="mx-auto">
            <Card>
              <div className="bg-success" style={{ height: "130px" }}>
                <div
                  style={{ borderRadius: "50%", height: "75px", width: "75px" }}
                  className="bg-white mx-auto my-2 d-flex align-items-end"
                >
                  <p className="mx-auto fs-2">✔</p>
                </div>
                <p className="mx-auto fs-4 text-white">Success!</p>
              </div>
              <CardBody>
                <CardTitle tag="h5">The interview have been saved</CardTitle>
                <Link to="/" className="btn btn-primary mt-2">
                  Go main
                </Link>
              </CardBody>
            </Card>
          </Col>
        </>
      )}
    </>
  );
};

export default MultiStepIndex;
