import React, {useEffect, useState} from "react";
import "./home.css";
import NowPlayingItem from "../../components/Movie/NowPlayingItem";
import PopularUpcomingItem from "../../components/Movie/PopularUpcomingItem";
import TopRated from "../../components/Movie/TopRatedItem";
import { Button, } from "react-bootstrap";
import SearchBar from "../../components/Movie/SearchBar";
import {Link} from "react-router-dom";
import axios from "axios";
import PopularUpcomingItemShimmer from "../../components/Movie/PopularUpcomingItemShimmer";
import NowPlayingItemShimmer from "../../components/Movie/NowPlayingItemShimmer";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const nowPlayingShimmerItems = [...Array(4).keys()]
    const shimmerItems = [...Array(6).keys()]

    const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
    };
    useEffect(() => {
      setLoading(true);
      const fetchDataNowPlaying = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL_MOVIE}movie/now_playing?language=en-US&page=1&region`, config);
          setNowPlayingMovies(res.data.results.slice(0, 4));
        }catch(err){
          console.log(err);
        }
      }

      const fetchDataPopular = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL_MOVIE}movie/popular?language=en-US&page=1&region`, config);
          setPopularMovies(res.data.results.slice(0, 6));
        }catch(err){
          console.log(err);
        }
      }

      const fetchDataTopRated = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL_MOVIE}movie/top_rated?language=en-US&page=1&region`, config);
          setTopRatedMovies(res.data.results.slice(0, 6));
        }catch(err){
          console.log(err);
        }
      }

      const fetchDataUpcoming = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL_MOVIE}movie/upcoming?language=en-US&page=1&region`, config);
          setUpcomingMovies(res.data.results.slice(2, 8));
          setLoading(false);
        }catch(err){
          console.log(err);
        }
      }

      fetchDataNowPlaying();
      fetchDataPopular();
      fetchDataTopRated();
      fetchDataUpcoming();
    }, []);

    return (
      <div>
        <div className="container-search-home">
          <SearchBar />
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Now Playing 🍿</p>
          <Link to={"/movies/now_playing"}>
            <Button variant="link">See More {">"}</Button>
          </Link>
        </div>
        <div className="container-now-playing">
          {
            loading ? (
              nowPlayingShimmerItems.map(() => {
                return (
                  <NowPlayingItemShimmer />
                );
              })
            ) : (
              nowPlayingMovies.map((movie) => {
                return (
                  <NowPlayingItem
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.backdrop_path}
                    releasedDate={movie.release_date}
                  />
                );
              })
            )
          }
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Popular</p>
          <Link to={"/movies/popular"}>
            <Button variant="link">See More {">"}</Button>
          </Link>
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
              popularMovies.map((movie) => {
                return (
                  <PopularUpcomingItem
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.poster_path}
                    releasedDate={movie.release_date}
                  />
                );
              })
            )
          }
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Top Rated</p>
          <Link to={"/movies/top_rated"}>
            <Button variant="link">See More {">"}</Button>
          </Link>
        </div>
        <div className="container-top-rated">
          {
            loading ? (
              shimmerItems.map(() => {
                return (
                  <PopularUpcomingItemShimmer />
                );
              })
            ) : (
              topRatedMovies.map((movie) => {
                return (
                  <TopRated
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.poster_path}
                    releasedDate={movie.release_date}
                    score={movie.vote_average}
                  />
                );
              })
            )
          }
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Upcoming</p>
          <Link to={"/movies/upcoming"}>
            <Button variant="link">See More {">"}</Button>
          </Link>
        </div>
        <div className="container-upcoming">
          {
            loading ? (
              shimmerItems.map(() => {
                return (
                  <PopularUpcomingItemShimmer />
                );
              })
            ) : (
              upcomingMovies.map((movie) => {
                return (
                  <PopularUpcomingItem
                    key={movie.id}
                    idMovie={movie.id}
                    title={movie.title}
                    imageUrl={movie.poster_path}
                    releasedDate={movie.release_date}
                  />
                );
              })
            )
          }
        </div>
      </div>
    );
}