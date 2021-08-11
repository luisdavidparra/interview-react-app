import { useParams } from "react-router";
import { useEffect, useState } from "react";
import AverageCircle from "./AverageCircle";

const fetchOneInterview = async (id) => {
  const res = await fetch(`http://localhost:8080/interviews/${id}`);
  const data = await res.json();
  return data;
};

const IndividualResults = () => {
  const [interview, setInterview] = useState();
  const [tecAverage, setTecAverage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOneInterview(id);
      setInterview(data);
    };
    getData();
  }, [id]);

  useEffect(() => {
    if (!interview) {
      return null;
    }

    interview.tecToAsk.forEach((tec) => {
      const tecResult = Object.entries(interview).reduce((accumulate, [question, result]) => {
        if (question.endsWith(`${tec}`)) {
          return accumulate + parseInt(result);
        } else {
          return accumulate;
        }
      }, 0);
      setTecAverage((tecAverage) => [...tecAverage, { [tec]: tecResult }]);
    });
  }, [interview]);


  if (!interview) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="card w-75 m-auto">
      <div className="position-relative">
        <img
          src="https://i.stack.imgur.com/l60Hf.png"
          className="card-img-top"
          alt="..."
          style={{ height: "250px", objectFit: "cover" }}
        />
        <h3 className="position-absolute bottom-0 mb-4 mx-2 h1">{`${interview.name} ${interview.lastname}`}</h3>
        <h5 className="position-absolute bottom-0 mx-2 h6">{`${interview.email}`}</h5>
      </div>
      <div className="card-body row">
        <div className="col-12 col-md-6 mb-3">
          {tecAverage &&
            tecAverage.map((tec, i) => {
              const average = (Object.values(tec) * 100) / 18;
              return (
                <div key={i}>
                  <h3 className="text-start mt-1 mb-0">{Object.keys(tec)}</h3>
                  <div className="text-start">
                    <span className="fs-5">Average: </span>
                    <span className="fs-5">{average.toFixed(0)}</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${average}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <AverageCircle totalAverage={interview.totalAverage} />
        </div>
      </div>
    </div>
  );
};

export default IndividualResults;
