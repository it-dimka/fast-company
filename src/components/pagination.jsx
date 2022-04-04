import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange, onPrevPage, onNextPage }) => {
  const pageCount = Math.ceil(itemCount / pageSize); // округление в большую сторону
  if (pageCount <= 1) return null;

  const pages = _.range(1, pageCount + 1); // lodash range - заполняет массив

  return (
    <nav>
      <ul className="pagination ms-1">
        <button
          className={"btn btn-primary btn-sm me-5"}
          disabled={currentPage <= 1}
          onClick={onPrevPage}
        >prev</button>

        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={`page_${page}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <button
          className={"btn btn-primary btn-sm ms-5"}
          disabled={currentPage >= pageCount}
          onClick={onNextPage}
        >next</button>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired
};

export default Pagination;
