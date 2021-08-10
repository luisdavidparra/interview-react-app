import { useEffect, useState } from "react";
import { getAllQuestions } from "../../services/questions";
import { useDataContext } from "./../../contexts/DataContext";

const IndividualQuest = ({ Tec }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuest = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
    };
    getQuest();
  }, []);

  const { methods } = useDataContext();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div>
      {questions.map((quest, i) => (
        <div className="justify-content-between" key={i}>
          <h6 className="text-start">
            {quest.name}
            {Tec}
          </h6>
          <div className="justify-content-between d-flex row">
            <div className="d-flex justify-content-between col-12 col-md-9">
              {[...Array(7).keys()].map((opt) => (
                <div className="middle-size">
                  <div className="d-inline-block form-check " key={opt}>
                    <input
                      className="form-check-input fs-5 mx-1"
                      type="radio"
                      name="flexRadioDefault"
                      id={`flexRadioDefault${Tec}${quest.name}${opt}`}
                      value={opt}
                      {...register(`${quest.name}${Tec}`, { required: "This is requiered" })}
                    />
                    <label
                      className="form-check-label align-middle fs-5"
                      htmlFor={`flexRadioDefault${Tec}${quest.name}${opt}`}
                    >
                      {opt}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 col-md-3 text-end text-danger fw-bold">
              {errors[`${quest.name}${Tec}`] && <span>{errors[`${quest.name}${Tec}`].message}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndividualQuest;
