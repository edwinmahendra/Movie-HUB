import React from "react";
import "./RecommendationItem.css";
import { useNavigate } from "react-router-dom";
import placeholderPoster from "../../assets/placeholder_poster_land.png";

const RecommendationItem = ({ movieId, title, pictUrl, releaseDate }) => {
  const navigate = useNavigate();
  let formatedDate = new Date(releaseDate);
  formatedDate = formatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleClick = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="recommendation-card">
      <img
        className="recommendation-image"
        src={process.env.REACT_APP_BASE_URL_IMG_MOVIE + pictUrl}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = placeholderPoster;
        }}
        onClick={handleClick}
      ></img>
      <div className="recommendation-details">
        <p className="movie-title">{title}</p>
        <p className="recommendation-percentage">{formatedDate}</p>
      </div>
    </div>
  );
};

export default RecommendationItem;
