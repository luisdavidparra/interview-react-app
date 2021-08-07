import { useParams } from "react-router";
import { useEffect, useState } from "react";
import AverageCircle from "./AverageCircle";

const IndividualResults = () => {
  const [interview, setInterview] = useState();
  const { id } = useParams();

  const fetchOneInterview = async () => {
    const res = await fetch(`http://localhost:8080/interviews/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOneInterview();
      setInterview(data);
    };
    getData();
  }, []);
  console.log(id);

  if (!interview) {
    return <h4>Loading...</h4>;
  }
  return (
    <div className="card w-75 m-auto">
      {/* <button onClick={() => console.log(interview)}>Show</button> */}
      <div className="position-relative">
        <img
          src="https://i.stack.imgur.com/l60Hf.png"
          className="card-img-top"
          alt="..."
          style={{ height: "250px", objectFit: "cover" }}
        />
        <h3 className="position-absolute bottom-0 mx-2 h1">{`${interview.name} ${interview.lastName}`}</h3>
      </div>
      <div className="card-body row">
        <div className="col-12 col-md-6 mb-3">
          {interview.userScoreInfo.map((tec) => {
            const data = Object.entries(tec);
            console.log(data[0]);
            return (
              <div>
                <h3 className="text-start mt-1 mb-0">{data[0][0]}</h3>
                <div className="text-start">
                  <span className="fs-5">Average: </span>
                  <span className="fs-5">{data[0][1].average.toFixed(0)}</span>
                </div>
                <div class="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${data[0][1].average.toFixed(0)}%` }}
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
