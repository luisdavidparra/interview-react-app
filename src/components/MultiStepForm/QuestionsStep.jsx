import { useDataContext } from "./../../contexts/DataContext";
import IndividualQuest from "./IndividualQuest";

const QuestionsStep = () => {
  const { methods } = useDataContext();
  const {
    watch,
    formState: { errors },
  } = methods;

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {watch().tecToAsk.map((Tec, index) => (
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
                  {errors.Tec && <span className="text-danger">Falta llenar esta opción</span>}
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
                <IndividualQuest Tec={Tec} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ul>
        {watch().tecToAsk.map((tec) => (
          questions.map(quest=> (
            <li>{quest.quest}{tec}</li>
          ))
        ))}
      </ul> */}
    </div>
  );
};

export default QuestionsStep;
