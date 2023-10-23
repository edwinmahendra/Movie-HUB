import React, { useState } from "react";
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
import bookmark1 from "../../assets/bookmark_1.svg";
import bookmark2 from "../../assets/bookmark_2.svg";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";

export const Detail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="detail-movie">
      <div className="div">
        <div className="box">
          <div className="btn-home-detail">
            <ButtonBackHome/>
          </div>
          <div className="group">
            <SearchBar />
          </div>
        </div>
        <div className="overlap-group">
          <div className="rectangle" />
          <img className="main-image" alt="main image" src={mainimage} />
          <img
            className="bookmark-icon"
            alt="Bookmark Icon"
            src={isBookmarked ? bookmark1 : bookmark2}
            onClick={toggleBookmark}
          />
          <p className="header-movie">
            <span className="text-wrapper">Game of Thrones </span>
            <span className="span">(2011)</span>
          </p>
          <div className="text-wrapper-2">84% User Score</div>
          <div className="text-wrapper-3">Creator</div>
          <div className="text-wrapper-4">David Benioff, D.B. Weiss</div>
          <p className="sci-fi-fantasy-drama">
            Sci-Fi &amp; Fantasy, Drama, Action &amp; Adventure
          </p>
          <div className="text-wrapper-6">04/17/2011 |</div>
        </div>
        <div className="text-wrapper-8">Movie Overview</div>
        <p className="seven-noble-families">
          Seven noble families fight for control of the mythical land of
          Westeros. Friction between the houses leads to full-scale war. All
          while a very ancient evil awakens in the farthest north. Amidst the
          war, a neglected military order of misfits, the Night&#39;s Watch, is
          all that stands between the realms of men and icy horrors beyond.
        </p>
        <div class="cast-section">
          <h2 class="cast-label">Cast and Crew</h2>
          <div class="container-cast">
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
            <CastItem />
          </div>
        </div>
        <div class="trailer-section">
          <h2 class="trailer-label">Trailer Movie</h2>
          <div class="container-trailer">
            <TrailerItem />
            <TrailerItem />
            <TrailerItem />
            <TrailerItem />
          </div>
        </div>
        <hr class="line" />
        <div class="recommendation-section">
          <h2 class="recommendation-label">Recommendation</h2>
          <div class="container-recommendation">
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
            <RecommendationItem />
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
  );
};
