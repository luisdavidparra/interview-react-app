import PaginationBar from "./PaginationBar";

const Pagination = ({ interviews, postPerPage, paginate, currentPage }) => {
  if (!interviews) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <PaginationBar
        postPerPage={postPerPage}
        totalPost={interviews.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Pagination;
