import { useEffect, useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Posts = ({ posts, deleteInterview, currentPage, postPerPage }) => {
  const [loading, setLoading] = useState(true);

  const number = postPerPage * (currentPage - 1);
  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  if (loading) {
    return null;
  }
  return (
    <>
      {posts.map((current, index) => {
        return (
          <tr key={index} className="align-middle row">
            <th scope="row" className="col-1 text-center">
              {number + index + 1}
            </th>
            <td className="col-4 align-items-center d-flex">{`${current.name} ${current.lastname}`}</td>
            <td className="col-2 align-items-center d-flex">{current.totalAverage.toFixed(0)}</td>
            <td className="col-3 align-items-center d-flex">
              {current.date.day}/{current.date.month}/{current.date.year}
            </td>
            <td className="col-2">
              <div className="row d-flex justify-content-around ">
                <Link
                  className="align-items-center btn btn-primary d-flex float-end fs-4 justify-content-center p-3 col-sm-3 col-md-4 col-9 mb-1"
                  to={`interview/${current.id}`}
                >
                  <FontAwesomeIcon icon={faChartPie} />
                </Link>
                <button
                  className="align-items-center btn btn-danger d-flex float-end fs-4 justify-content-center p-3 col-sm-3 col-md-4 col-9"
                  onClick={() => deleteInterview(current.id)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Posts;
