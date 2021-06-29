import { useDataContext } from "../../contexts/DataContext";
import "./IndividualQuest.css";

const IndividualQuest = ({ quest, Tec, index }) => {
  const { Questions, methods } = useDataContext();

  const options = [0, 1, 2, 3, 4, 5, 6];
  const indiQuest = `${quest}${Tec}?`;
  const {
    register,
    formState: { errors },
  } = methods;
  return (
    <>
      <div className="justify-content-between">
        <h6 className="text-start">{indiQuest}</h6>
        <div className="justify-content-between d-flex row">
          <div className="d-flex justify-content-between col-12 col-md-9">
            {options.map((opt) => (
              <>
                <div className="middle-size">
                  <div className="d-inline-block form-check " key={opt}>
                    <input
                      className="form-check-input fs-5 mx-1"
                      type="radio"
                      name="flexRadioDefault"
                      id={`flexRadioDefault${Tec}${quest}${opt}`}
                      value={opt}
                      {...register(indiQuest, { required: "This is requiered" })}
                    />
                    <label
                      className="form-check-label align-middle fs-5"
                      htmlFor={`flexRadioDefault${Tec}${quest}${opt}`}
                    >
                      {opt}
                    </label>
                  </div>
                </div>
                <div className="small-size">
                  <div className="d-inline-block form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id={`flexRadioDefault${Tec}${quest}${opt}`}
                      value={opt}
                      {...register(indiQuest, { required: "This is requiered" })}
                    />
                    <label
                      className="form-check-label align-middle fs-5"
                      htmlFor={`flexRadioDefault${Tec}${quest}${opt}`}
                    >
                      {opt}
                    </label>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="col-12 col-md-3 text-end text-danger fw-bold">
            {errors[indiQuest] && <span>{errors[indiQuest].message}</span>}
          </div>
        </div>

        {index !== Questions.length - 1 && <hr />}
      </div>
    </>
  );
};

export default IndividualQuest;
