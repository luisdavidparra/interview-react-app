import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import "./NewInterview.css";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import { getAllTechnologies } from "../services/technologies";

const NewInterview = () => {
  const { setNewUser, newUser, setTecSelected } = useDataContext();
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const getTec = async () => {
      const data = await getAllTechnologies();
      setTechnologies(data);
    };
    getTec();
  }, []);

  const onSubmit = (e) => {
    const data = Object.entries(e).reduce((accum, [name, value]) => {
      if (value === true) {
        return [...accum, name];
      }
      return accum;
    }, []);

    if (data.length === 0) {
      setError(true);
      return;
    }

    setTecSelected(data);

    const newUserToSave = {
      name: e.userName,
      lastName: e.userLastName,
      technologies: [data],
    };
    setNewUser(newUserToSave);
  };

  const onError = (e) => {
    console.log(e);
  };

  if (newUser) {
    return <Redirect to={"/accordion"} />;
  }
  return (
    <div className="col-11 col-lg-8 col-md-11 m-auto card p-3">
      <p className="h3 text-start">Candidate information:</p>
      <form className="text-start" onSubmit={handleSubmit(onSubmit, onError)}>
        <div style={{ position: "relative", height: "45px", display: "inline-block" }} id="target1">
          <input
            className="form-control mr-1"
            type="text"
            name="user"
            placeholder="Name"
            maxLength="10"
            minLength="2"
            style={{ borderColor: errors["userName"] ? "red" : "black", borderRadius: "4px" }}
            {...register("userName", { required: "This is required" })}
          />
        </div>
        <div style={{ position: "relative", height: "45px", display: "inline-block" }} id="target1">
          <input
            className="form-control"
            type="text"
            name="user"
            maxLength="10"
            minLength="2"
            placeholder="Last Name"
            style={{ borderColor: errors["userLastName"] ? "red" : "black", borderRadius: "4px" }}
            {...register("userLastName", { required: "This is required" })}
          />
        </div>
        <div className="row m-0 py-2">
          <p className="h5">Select the technologies to quest:</p>
          {!technologies ? (
            <p>Cargando...</p>
          ) : (
            technologies.map((tec) => (
              <>
                <div className="form-check col-5 d-flex justify-content-envely">
                  <input className="form-check-input" type="checkbox" value="" id={tec.tec} {...register(tec.tec)} />
                  <label className="form-check-label" for={tec.tec}>
                    {tec.tec}
                  </label>
                </div>
              </>
            ))
          )}
        </div>
        <div>
          <Link to="/" className="btn btn-danger">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary mx-3 px-4">
            Next
          </button>
        </div>
        {error && <span className="pt-2 d-block text-danger">You need to pick at least 1 technology</span>}
      </form>
    </div>
  );
};

export default NewInterview;
