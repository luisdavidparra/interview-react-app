const PaginationBar = ({ postPerPage, totalPost, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? " active" : ""}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationBar;
