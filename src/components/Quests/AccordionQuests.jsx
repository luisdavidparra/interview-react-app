/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import TechnologyQuests from "./TechnologyQuests";
import { FormProvider } from "react-hook-form";
import AverageCircle from "../AverageCircle";
import { useDataContext } from "../../contexts/DataContext";
import { useHistory, Redirect } from "react-router-dom";

const AccordionQuests = () => {
  const {
    answerData,
    scoreData,
    setScoreData,
    Questions,
    setTotalAverage,
    totalAverage,
    methods,
    newUser,
    setNewUser,
    tecSelected,
    setTecSelected,
  } = useDataContext();

  const [isDone, setIsDone] = useState(false);
  const {
    formState: { errors, isSubmitted },
  } = methods;

  let history = useHistory();

  const onSubmit = (data) => {
    fillScoreData(data);
  };

  const onError = (error) => console.log(error);

  const fillStartScore = () => {
    tecSelected.map((tec) =>
      setScoreData((scoreD) => [
        ...scoreD,
        { technology: tec, answerTechnologyScore: 0, totalPosible: 0, technologyAverage: 0 },
      ])
    );
  };

  const fillScoreData = (data) => {
    const sumPoints = Object.entries(data).reduce((accumulate, [question, value]) => {
      return accumulate + parseInt(value);
    }, 0);
    const calculatedAverage = (sumPoints * 100) / (tecSelected.length * Questions.length * 6);
    setTotalAverage(calculatedAverage);

    setScoreData((scoreData) => {
      const newData = scoreData.map((scoreD) => {
        const questAnswered = Object.entries(data).reduce((accumulate, [question, value, average]) => {
          if (question.endsWith(`${scoreD.technology}?`)) {
            return accumulate + 1;
          } else {
            return accumulate;
          }
        }, 0);
        const sum = Object.entries(data).reduce((accumulate, [question, value, average]) => {
          if (question.endsWith(`${scoreD.technology}?`)) {
            return accumulate + parseInt(value);
          } else {
            return accumulate;
          }
        }, 0);
        const ave = (sum * 100) / (questAnswered * 6);
        const totalPoint = questAnswered * 6;
        return { ...scoreD, answerScore: sum, average: ave, totalPosible: totalPoint };
      });
      return newData;
    });
  };

  const onAddNewInterview = (e) => {
    fetch(`http://localhost:8080/interviews`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(e),
    });
    console.log("added");
  };

  const saveNewInterview = useCallback((scoreData) => {
    const randomId = Math.floor(Math.random() * Date.now());
    const date = new Date();
    const dateHour = date.getHours();
    const dateDay = date.getDate();
    const dateDayWeek = date.getDay();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    const userScoreInfo = scoreData.map((sco, index) => {
      return {
        [sco.technology]: {
          average: sco.average,
          goodAnswers: sco.answerScore,
          totalPosible: sco.totalPosible,
        },
      };
    });
    return {
      name: newUser.name,
      lastName: newUser.lastName,
      date: { dayWeek: dateDayWeek, day: dateDay, month: dateMonth, hour: dateHour, year: dateYear },
      userScoreInfo,
      totalAverage: totalAverage,
      id: randomId,
    };
  });

  // const onCancel = () => {
  //   const res = window.confirm("Sure u want to leave?");
  //   if (res) {
  //     setNewUser();
  //     setTecSelected();
  //   }
  // };

  useEffect(() => {
    fillStartScore();
  }, []);

  useEffect(() => {
    if (!isSubmitted || Object.entries(errors).length > 0) {
      methods.formState.isSubmitted = false;
      return;
    }
    onAddNewInterview(saveNewInterview(scoreData));
  }, [saveNewInterview, scoreData, isSubmitted, errors]);

  if (!newUser) {
    return <Redirect to={"/new-interview"} />;
  }
  return (
    <div>
      <p className="h4">
        Candidate: {newUser.name} {newUser.lastName}
        <hr />
      </p>
      {!totalAverage > 0 && (
        <FormProvider methods={methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className="accordion" id="accordionExample">
              {tecSelected.map((Tec, index) => (
                <div className={`accordion-item`} style={{ backgroundColor: errors[Tec] && "red" }} key={index}>
                  <h2 className="accordion-header" id={Tec}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      <div className="d-flex justify-content-between w-50">
                        {Tec}
                        {methods.errors && <span className="text-danger">Falta llenar esta opción</span>}
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body bg-white d-flex justify-content-between">
                      <TechnologyQuests Tec={Tec} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
              <a className="btn btn-danger mt-3" href="/">
                Cancel
              </a>
            </div>
          </form>
        </FormProvider>
      )}
      {Object.entries(errors).length > 0 && <span>There's some errors</span>}
      <ul>
        {answerData &&
          answerData.map((ans, index) => (
            <li key={index}>
              {ans.quest}: {ans.result}
            </li>
          ))}
      </ul>
      {totalAverage > 0 && (
        <>
          <div className="row">
            <div className="col-7">
              <h5>Success!! There's the results</h5>
              {scoreData.map((scoreD, index) => (
                <div key={index}>
                  <strong>
                    {scoreD.technology}: {scoreD.answerScore}/ {scoreD.totalPosible}
                  </strong>
                  <div class="progress w-100 mb-3">
                    <div
                      class="progress-bar progress-bar-striped"
                      role="progressbar"
                      style={{ width: `${scoreD.average}%` }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-5">
              <AverageCircle totalAverage={totalAverage} />
            </div>
          </div>
          <a href="/" className="mt-3 btn btn-secondary float-end">
            Go to main
          </a>
        </>
      )}
      {scoreData > 0 && <h2>Average: {totalAverage}</h2>}
    </div>
  );
};

export default AccordionQuests;
