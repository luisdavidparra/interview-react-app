import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListOfQuest = () => {
  const [technologies, setTechnologies] = useState([]);

  const fetchTec = async () => {
    const res = await fetch("http://localhost:8080/technologies");
    const data = res.json();
    return data;
  };

  const onAddTec = (e) => {
    const dataToSave = { tec: e };
    const id = technologies[technologies.length - 1].id;

    console.log(technologies[e]);

    fetch(`http://localhost:8080/technologies`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataToSave),
    });
    setTechnologies([...technologies, { tec: e, id: id + 1 }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value);
    if (e.target.form[0].value !== "") {
      onAddTec(e.target.form[0].value);
      e.target.form[0].value = "";
    }
  };

  const onDeleteTec = async (text, id) => {
    const decision = window.confirm(`Ara you sure you want to delete: ${text}?`);

    if (decision) {
      await fetch(`http://localhost:8080/technologies/${id}`, { method: "DELETE" });
      setTechnologies(technologies.filter((tec) => tec.id !== id));
    }
  };

  useEffect(() => {
    const getTec = async () => {
      const data = await fetchTec();
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
    <>
      <div className="col-12 col-md-10 m-auto">
        <p className="h5 text-start">List of technologies:</p>
        {!technologies ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <ul className="list-group">
            {technologies.map((tec) => (
              <li className="align-items-center d-flex justify-content-between list-group-item">
                {tec.name}{" "}
                <button
                  className="align-items-center btn btn-danger d-flex float-end fs-5 justify-content-center p-3"
                  onClick={() => onDeleteTec(tec.tec, tec.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
            <li className="list-group-item">
              <form className="d-flex">
                <input type="text" className="form-control" placeholder="New technology" />
                <button
                  disabled={technologies.length > 12 && true}
                  className="btn btn-primary col-3 mx-1"
                  onClick={(e) => onSubmit(e)}
                >
                  Save
                </button>
              </form>
              {technologies.length > 12 && (
                <span className="text-center d-block text-danger">To much technologies saved</span>
              )}
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default ListOfQuest;
