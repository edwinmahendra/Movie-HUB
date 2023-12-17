import React, { useState, useEffect, useCallback } from "react";
import SearchResultItem from "./SearchResultsItem";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import "./SearchResults.css";
import MoviePagination from "../Pagination/MoviePagination";
import axios from "axios";
import { useSearchParams, } from "react-router-dom";
import SearchBar from "../Movie/SearchBar";
import { PropagateLoader } from "react-spinners"
import FilterMovie from "../Movie/FilterMovie";

const SearchResult = () => {
  const [query, setQuery] = useSearchParams();
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortMethod, setSortMethod] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [appliedGenres, setAppliedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
  };

  useEffect(() => {
    setIsLoading(true);
    searchMovies();
  }, [query, currentPage]);

  useEffect(() => {
    sortMovies(sortMethod);
  }, [searchResults, sortMethod]);

  useEffect(() => {
    filterMovies();
  }, [appliedGenres]);

  const searchMovies = async () => {
    try {
      const queryParam = query.get("q");
      const res = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL_MOVIE
        }search/movie?query=${encodeURIComponent(
          queryParam
        )}&language=en-US&page=${currentPage}&include_adult=false`,
        config
      );
      setSearchResults(res.data.results);
      setTotalPages(res.data.total_pages > 50 ? 50 : res.data.total_pages);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sortMovies = (method) => {
    const sorted = [...searchResults].sort((a, b) => {
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
    setTotalPages(Math.floor(sorted.length / 20) + 1);
  };

  const filterMovies = () => {
    const filtered = [...searchResults].filter((movie) => {
      return appliedGenres.every((genre) => {
        return movie.genre_ids.includes(genre);
      });
    });
    setSortedMovies(filtered);
    setTotalPages(Math.floor(filtered.length / 20) + 1);
  };

  const handleSorting = (method) => {
    setSortMethod(method);
  };

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    searchMovies();
  }, []);

  const handleSearch = (query) => {
    setQuery(
      new URLSearchParams({
        q: query,
      })
    );
  };

  const showFilterModal = (state) => {
    setShowFilter(state);
  };

  const handleApply = (selectedGenres) => {
    setAppliedGenres(selectedGenres);
    showFilterModal(false);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <PropagateLoader
          size={30}
          color="#6680C0" />
      </div>
    );
  }else if(!isLoading && searchResults.length === 0){
        return (
      <div>
        <div className="container-search-home">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="no-results-container">
          <p className="no-results">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-search-home">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="filter-sort">
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
        <Button id="filter" onClick={() => showFilterModal(true)}>Filter</Button>
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

      <div style={{ marginTop: "2rem" }}>
        <MoviePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handlePageChange}
        />
      </div>

      <FilterMovie show={showFilter} hide={() => showFilterModal(false)} handleApplyGenres={handleApply} />
    </div>
  );
};

export default SearchResult;
