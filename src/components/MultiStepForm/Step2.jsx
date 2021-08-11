import { useEffect, useState } from "react";
import { Col, FormText, Row } from "reactstrap";
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

  if (!technologies) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h5>Select the technologies to ask (at least one)</h5>
      <Row>
        {technologies.map((tec, id) => (
          <Col sm="4">
            <div key={id}>
              <label sm>
                {tec.name} {' '}
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
          </Col>
        ))}
      </Row>
      {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
    </div>
  );
};

export default Step2;
