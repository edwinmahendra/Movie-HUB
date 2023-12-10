import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./SearchResultsItem.css";

const SearchResultItem = ({
  idMovie,
  title,
  imageUrl,
  releasedDate,
  description,
}) => {
  const detailPagePath = `/detail/${idMovie}`;

  return (
    <Link to={detailPagePath} className="search-result-item">
      <Card className="search-item">
        <Card.Img
          className="search-poster-img"
          variant="top"
          src={imageUrl}
          alt="Poster"
        />
        <Card.Body className="search-item-body">
          <Card.Title className="search-item-title">{title}</Card.Title>
          <Card.Text className="search-item-date">
            {new Date(releasedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Card.Text>
          <Card.Text className="search-item-description">
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
  // return (
  //     <Link to={detailPagePath} className="search-result-item">
  //       <div className="search-item-image">
  //         {/* Ensure you have the correct base URL for images */}
  //         <img src={`https://image.tmdb.org/t/p/w500${imageUrl}`} alt={title} />
  //       </div>
  //       <div className="search-item-content">
  //         <h3 className="search-item-title">{title}</h3>
  //         <p className="search-item-date">{releasedDate}</p>
  //       </div>
  //     </Link>
  //   );
};

SearchResultItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  releasedDate: PropTypes.string.isRequired,
};

export default SearchResultItem;
