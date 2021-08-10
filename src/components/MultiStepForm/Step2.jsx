import { useEffect, useState } from "react";
import { FormText } from "reactstrap";
import { getAllTechnologies } from "../../services/technologies";
import { useDataContext } from "./../../contexts/DataContext";

const Step2 = () => {
  const [technologies, setTechnologies] = useState([]);
  const { methods } = useDataContext();
  const {
    register,
    formState: { errors },
  } = methods;
  useEffect(() => {
    const getTec = async () => {
      const data = await getAllTechnologies();
      setTechnologies(data);
    };
    getTec();
  }, []);
  return (
    <div>
      {technologies.map((tec) => (
        <div key={tec.name}>
          <label>
            {tec.name}
            <input
              type="checkbox"
              value={tec.name}
              name="tec"
              {...register("tecToAsk", {
                required: "Need to pick at least one tec",
              })}
            />
          </label>
        </div>
      ))}
      {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
    </div>
  );
};

export default Step2;
