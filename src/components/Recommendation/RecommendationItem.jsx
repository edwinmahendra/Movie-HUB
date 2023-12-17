import React from "react";
import "./RecommendationItem.css"
import { useNavigate } from "react-router-dom";

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
      <div
        className="recommendation-image"
        style={{
          backgroundImage: `url(${
            process.env.REACT_APP_BASE_URL_IMG_MOVIE + pictUrl
          })`,
        }}
        onClick={handleClick}
      ></div>
      <div className="recommendation-details">
        <p className="movie-title">{title}</p>
        <p className="recommendation-percentage">{formatedDate}</p>
      </div>
    </div>
  );
};

export default RecommendationItem;