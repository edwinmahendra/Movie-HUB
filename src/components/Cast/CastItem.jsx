import React from 'react';
import './cast.css';
import castDummyImage from "../../assets/castdummy.jpg";


const CastItem = ({actorName, character, profilePict}) => {
  return (
    <div className="cast-card">
      <div className="card-image" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL_IMG_MOVIE + profilePict})` }}></div>
      <div className="card-details">
        <p className="actor-name">{actorName}</p>
        <p className="character-name">{character}</p>
      </div>
    </div>
  );
}

export default CastItem;