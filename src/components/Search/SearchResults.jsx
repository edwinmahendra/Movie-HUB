import React, { useState, useEffect } from "react";
import SearchResultItem from "./SearchResultsItem";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./SearchResults.css";

const SearchResult = ({ movies }) => {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortMethod, setSortMethod] = useState("title-asc");
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    function sortMovies(method) {
      const sorted = [...movies].sort((a, b) => {
        switch (method) {
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "date-asc":
            return new Date(a.release_date) - new Date(b.release_date);
          case "date-desc":
            return new Date(b.release_date) - new Date(a.release_date);
          default:
            return 0;
        }
      });
      setSortedMovies(sorted);
    }

    sortMovies(sortMethod);
  }, [movies, sortMethod]);

  const handleSorting = (method) => {
    setSortMethod(method);
  };

  
if (movies.length === 0) {
    return (
      <div className="no-results-container">
        <p className="no-results">No results found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sorting-dropdown">
        <DropdownButton id="sorting-dropdown" title="Sort by">
          <Dropdown.Item onClick={() => handleSorting("title-asc")}>
            Alphabetically A-Z
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("title-desc")}>
            Alphabetically Z-A
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("date-asc")}>
            Date Oldest-First
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("date-desc")}>
            Date Newest-First
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="search-results-container">
        {sortedMovies.map((movie) => (
          <SearchResultItem
            key={movie.id}
            idMovie={movie.id}
            title={movie.title}
            imageUrl={baseUrl + movie.poster_path}
            releasedDate={movie.release_date}
            description={movie.overview}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
