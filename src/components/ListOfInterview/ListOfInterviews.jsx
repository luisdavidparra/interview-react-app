import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import IndividualInterview from "./IndividualInterview";

const ListOfInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [currentPost, setCurrentPost] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInterviews = async () => {
    const res = await fetch("http://localhost:8080/interviews");
    const data = res.json();
    return data;
  };

  const paginate = (num) => {
    setCurrentPage(num);
  };
  const deleteInterview = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`http://localhost:8080/interviews/${id}`, { method: "DELETE" });
      setIsDeleting(true);
    } else {
      console.log("Didn't delete");
    }
  };

  useEffect(() => {
    const getInterviews = async () => {
      const interviewsFetched = await fetchInterviews();
      const indexOfLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage;
      const currentPostData = interviewsFetched.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentPost(currentPostData);
      setInterviews(interviewsFetched);
    };
    getInterviews();
    console.log("Effect");
    setIsDeleting(false);
  }, [currentPage, postPerPage, isDeleting]);

  if (!currentPost) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="col-12 col-lg-10 col-md-11 m-auto">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr className="row text-center">
            <th scope="col" className="col-1">
              #
            </th>
            <th scope="col" className="col-4">
              Name
            </th>
            <th scope="col" className="col-2 Average">
              Average
            </th>
            <th scope="col" className="col-3">
              Date
            </th>
            <th scope="col" className="col-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <IndividualInterview
            posts={currentPost}
            deleteInterview={deleteInterview}
            currentPage={currentPage}
            postPerPage={postPerPage}
          />
        </tbody>
      </table>
      {interviews.length > postPerPage && (
        <Pagination
          interviews={interviews}
          paginate={paginate}
          postPerPage={postPerPage}
          currentPost={currentPost}
          currentPage={currentPage}
        />
      )}
      <a className="btn btn-primary px-3 mt-2 float-end" href="/new-interview">
        New Interview
      </a>
    </div>
  );
};

export default ListOfInterviews;
