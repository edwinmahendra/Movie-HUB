import React, { useEffect, useState } from "react";
import "./detail.css";
import logo from "../../assets/logo.svg";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";
import mainimage from "../../assets/mainimage.png";
import CastItem from "../../components/Cast/CastItem";
import TrailerItem from "../../components/Trailer/TrailerItem";
import RecommendationItem from "../../components/Recommendation/RecommendationItem";
import SearchBar from "../../components/Movie/SearchBar";
import bookmark1 from "../../assets/bookmark.svg";
import bookmark2 from "../../assets/bookmark-off.svg";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, addDoc,updateDoc, getFirestore,setDoc } from "firebase/firestore";
import SearchResults from "../../components/Search/SearchResults";

export const Detail = () => {
  const { idMovie } = useParams();
  const [userScore, setUserScore] = useState();
  const [genres, setGenres] = useState([]);
  const [videos, setVideos] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [casts, setCasts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to capture search term
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataMovies, setDataMovies] = useState();
  const db = getFirestore();
  const auth = getAuth();

  const toggleBookmark = async () => {
    const user = auth.currentUser;
    const userRef = collection(db, "Users", user.uid, "Bookmarks");
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user is currently signed in.");
        return;
      }
  
      const userId = user.uid;
      const movieId = idMovie;
  
      const bookmarkRef = doc(db, 'Users', userId, 'Bookmarks', movieId);
      const bookmarkDocSnapshot = await getDoc(bookmarkRef);
  
      if (bookmarkDocSnapshot.exists()) {
        await deleteDoc(bookmarkRef);
        console.log('Movie removed from bookmarks');
      } else {
        await setDoc(bookmarkRef, {
          idMovie: movieId,
          title: dataMovies.original_title,
          releaseDate: dataMovies.release_date,
          sinopsis: dataMovies.overview,
          genre: genres.join(", "),
          posterPath: process.env.REACT_APP_BASE_URL_IMG_MOVIE + dataMovies.poster_path,
          dateAdded: new Date().toISOString(),
        });
        console.log('Movie added to bookmarks');
      }
  
      setIsBookmarked(!bookmarkDocSnapshot.exists());
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
  };
  useEffect(() => {
    setIsLoading(true);
    getDetailMovie();
    getVideosUrl();
    getDirectorsCasts();
    getRecommendations();
    fetchBookmarks();
  
  }, [idMovie, db, auth]);

const fetchBookmarks = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user is currently signed in.");
          return;
        }
  
        const userId = user.uid;
        const movieId = idMovie;
  
        const bookmarkRef = doc(db, 'Users', userId, 'Bookmarks', movieId);
        const bookmarkDocSnapshot = await getDoc(bookmarkRef);
        if (bookmarkDocSnapshot.exists()) {
          setIsBookmarked(true)
          await deleteDoc(bookmarkRef);
          console.log('Movie removed from bookmarks');
        } else {
          setIsBookmarked(false)
        }
  
        const initialIsBookmarked = bookmarkDocSnapshot.exists();
  
        setIsBookmarked(initialIsBookmarked);
  
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    };

  const getDetailMovie = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${idMovie}`,
        config
      );
      setDataMovies(res.data);
      setIsLoading(false);

      let formatedScore = Number(res.data.vote_average * 10);
      setUserScore(formatedScore.toFixed(1));

      let genres = res.data.genres.map((genre) => genre.name);
      setGenres(genres);
    } catch (err) {
      console.log(err);
    }
  };

  const getVideosUrl = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${idMovie}/videos`,
          config
        )
        .then((res) => {
          let videos = res.data.results.map((video) => video.key);
          setVideos(videos);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getDirectorsCasts = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${idMovie}/credits`,
          config
        )
        .then((res) => {
          let directors = res.data.crew.filter(
            (crew) => crew.job === "Director"
          );
          directors = directors.map((director) => director.name);
          let casts = res.data.cast;
          setDirectors(directors);
          setCasts(casts);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/home?search=${encodeURIComponent(query)}`); // Redirect to home with query using navigate
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_BASE_URL_MOVIE}movie/${idMovie}/similar`,
          config
        )
        .then((res) => {
          let recommendations = res.data.results;
          setRecommendations(recommendations);
          console.log("recommendations", recommendations);
        });
    } catch (err) {
      console.log(err);
    }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="detail-movie">
        <div className="div">
          <div className="box">
            <div className="btn-home-detail">
              <ButtonBackHome />
            </div>
            <div className="group">
            <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <div className="overlap-group">
            <div className="rectangle" />
            <img className="main-image rounded" alt="main image" src={process.env.REACT_APP_BASE_URL_IMG_MOVIE + dataMovies.poster_path} />
            <img
              className="bookmark-icon"
              alt="Bookmark Icon"
              src={isBookmarked ? bookmark1 : bookmark2}
              onClick={toggleBookmark}
            />
            <p className="header-movie">
              <span className="text-wrapper">{dataMovies.original_title}</span>
              <span className="span"> {`(${dataMovies.release_date.slice(0,4)})`}</span>
            </p>
            <div className="text-wrapper-2">{`${userScore}% User Score`}</div>
            <div className="text-wrapper-3">Creator</div>
            <div className="text-wrapper-4">{directors.join(", ")}</div>
            <p className="sci-fi-fantasy-drama">
              {genres.join(", ")}
            </p>
            <div className="text-wrapper-6">{`${dataMovies.release_date} |`}</div>
          </div>
          <div className="text-wrapper-8">Movie Overview</div>
          <p className="seven-noble-families">
            {dataMovies.overview}
          </p>
          <div class="cast-section">
            <h2 class="cast-label">Cast and Crew</h2>
            <div class="container-cast">
              {casts.map((cast) => {
                return <CastItem actorName={cast.name} character={cast.character} profilePict={cast.profile_path} />;
              })}
            </div>
          </div>
          <div class="trailer-section">
            <h2 class="trailer-label">Trailer Movie</h2>
            <div class="container-trailer">
              {
                videos.map((youtubeKey) => {
                  return <TrailerItem youtubeKey={youtubeKey} />
                })
              }
            </div>
          </div>
          <hr class="line" />
          <div class="recommendation-section">
            <h2 class="recommendation-label">Recommendation</h2>
            <div class="container-recommendation">
              {
                recommendations.map((recommendation) => {
                  return <RecommendationItem movieId={recommendation.id} title={recommendation.original_title} pictUrl={recommendation.backdrop_path == null ? recommendation.poster_path : recommendation.backdrop_path} releaseDate={recommendation.release_date} />
                })
              }
            </div>
          </div>
          <div className="footer-box">
            <div className="footer-left">
              <img
                className="aatbio-com-image"
                alt="Aatbio com image"
                src={logo}
              />
            </div>
            <div className="footer-center">
              <img
                className="icon-instagram"
                alt="Instagram icon"
                src={instagram}
              />
              <img className="icon-youtube" alt="Youtube icon" src={youtube} />
              <img className="icon-twitter" alt="Twitter icon" src={twitter} />
              <img className="icon-facebook" alt="Facebook icon" src={facebook} />
            </div>
            <div className="footer-right">
              <p className="footer-text-wrapper">© 2023 - AGB Company.</p>
            </div>
          </div>
        </div>
      </div>
  )

  
};
