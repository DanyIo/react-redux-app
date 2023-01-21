import React from "react";
import { Item } from "semantic-ui-react";
import "../styles.css";
export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item" key={number}>
            <a
              className="page-link"
              href="!#"
              key={number}
              onClick={() => paginate(number)}
              style={
                number === currentPage
                  ? { backgroundColor: "pink" }
                  : { backgroundColor: undefined }
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
