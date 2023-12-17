import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import PopularUpcomingItem from "../../components/Movie/PopularUpcomingItem";
import SearchBar from "../../components/Movie/SearchBar";
import axios from "axios";
import MoviePagination from "../../components/Pagination/MoviePagination";
import PopularUpcomingItemShimmer from "../../components/Movie/PopularUpcomingItemShimmer";
import TopRatedItem from "../../components/Movie/TopRatedItem";

const MovieList = () => {
  const { movieType } = useParams();
  const [loading, setLoading] = useState(true);
  const [dataMovies, setDataMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const shimmerItems = [...Array(18).keys()];

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
  };

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${movieType}?language=en-US&page=${page}&region=ID`,
        config
      );
      setDataMovies(res.data.results.slice(0, 18));
      setTotalPages(res.data.total_pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    fetchMovies(pageNumber);
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, movieType]);

  return (
    <div>
      <div className="container-search-home">
        <SearchBar />
      </div>
      <div className="title-section">
        <p className="text-light fs-4 fw-bold text-capitalize">
          {movieType.replace("_", " ")}
        </p>
      </div>
      <div className="container-search">
        {loading
          ? shimmerItems.map((_, index) => (
              <PopularUpcomingItemShimmer key={index} />
            ))
          : dataMovies.map((movie) => {
              return movieType === "top_rated" ? (
                <TopRatedItem
                  key={movie.id}
                  idMovie={movie.id}
                  title={movie.title}
                  imageUrl={movie.poster_path}
                  releasedDate={movie.release_date}
                  score={movie.vote_average}
                />
              ) : (
                <PopularUpcomingItem
                  key={movie.id}
                  idMovie={movie.id}
                  title={movie.title}
                  imageUrl={movie.poster_path}
                  releasedDate={movie.release_date}
                />
              );
            })}
      </div>
      <MoviePagination
        key={currentPage} 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
};

export default MovieList;
