import React from "react";
import PaginationBar from "./PaginationBar";

const Pagination = ({ interviews, postPerPage, paginate, currentPage }) => {
 
  if (!interviews) {
    return <h4>Loading...</h4>;
  }
  return (
    <div>
      <PaginationBar postPerPage={postPerPage} totalPost={interviews.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};

export default Pagination;
