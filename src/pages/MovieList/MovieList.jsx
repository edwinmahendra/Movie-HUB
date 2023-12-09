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
  const shimmerItems = [...Array(18).keys()]

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
  };
  useEffect(() => {
    const initMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${movieType}?language=en-US&page=1&region=ID`,
          config
        );
        let data = res.data.results;
        setDataMovies(data.slice(0, 18));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    initMovies();
  }, []);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${movieType}?language=en-US&page=${page}&region=ID`,
        config
      );
      let data = res.data.results;
      setDataMovies(data.slice(0, 18));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    fetchMovies(pageNumber);
  }, []);


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
      <div className="container-popular">
        {
          loading ? (
            shimmerItems.map(() => {
              return (
                <PopularUpcomingItemShimmer />
              );
            })
          ) : (
            dataMovies.map((movie) => {
              if (movieType === "top_rated") {
                return (
                  <TopRatedItem
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.poster_path}
                    releasedDate={movie.release_date}
                    score={movie.vote_average}
                  />
                );
              } else {
                return (
                  <PopularUpcomingItem
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.poster_path}
                    releasedDate={movie.release_date}
                  />
                );
              }

      
            })
          )
        }
      </div>

      <MoviePagination
        currentPage={currentPage}
        totalPages={50}
        setCurrentPage={handlePageChange}
      ></MoviePagination>
    </div>
  );
};

export default MovieList;
