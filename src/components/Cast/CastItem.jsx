import React from 'react';
import './cast.css';
import castPlaceholder from '../../assets/cast_placeholder.jpg';

const CastItem = ({actorName, character, profilePict}) => {
  return (
    <div className="cast-card">
      <img className="card-image" src={process.env.REACT_APP_BASE_URL_IMG_MOVIE + profilePict}          
        onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=castPlaceholder;
          }}></img>
      <div className="card-details">
        <p className="actor-name">{actorName}</p>
        <p className="character-name">{character}</p>
      </div>
    </div>
  );
}

export default CastItem;