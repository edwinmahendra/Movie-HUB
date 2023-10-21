import React from "react";
import "./detail.css";
import mainimage from "../../assets/mainimage.png";
import CastItem from "../../components/Cast/CastItem";
import TrailerItem from "../../components/Trailer/TrailerItem";
import RecommendationItem from "../../components/Recommendation/RecommendationItem";

export const Detail = () => {
  return (
    <div className="detail-movie">
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle" />
          <img className="main-image" alt="main image" src={mainimage} />
          <p className="game-of-thrones">
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
        <div className="text-wrapper-7">Home</div>
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
      </div>
    </div>
  );
};
