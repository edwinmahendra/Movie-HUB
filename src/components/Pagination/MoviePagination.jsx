import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const MoviePagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [];
    
    const range = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    };

    if (totalPages <= 5) {
      tempNumberOfPages = range(1, totalPages);
    } else {
      if (currentPage <= 3) {
        tempNumberOfPages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        const sliced = range(currentPage - 1, currentPage + 1);
        tempNumberOfPages = [1, '...', ...sliced, '...', totalPages];
      } else {
        tempNumberOfPages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
    }

    setArrOfCurrButtons(tempNumberOfPages);
  }, [currentPage, totalPages]);

  const handleClick = (page) => {
    if (page === '...') {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
      />
      {arrOfCurrButtons.map((page, index) => (
        <Pagination.Item
          key={index}
          active={page === currentPage}
          onClick={() => handleClick(page)}
        >
          {typeof page === 'number' ? page : '...'}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
      />
    </Pagination>
  );
};

export default MoviePagination;