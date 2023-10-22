import React from 'react';
import './cast.css';
import castDummyImage from "../../assets/castdummy.jpg";

const CastItem = () => {
  return (
    <div className="cast-card">
      <div className="card-image" style={{ backgroundImage: `url(${castDummyImage})` }}></div>
      <div className="card-details">
        <p className="actor-name">Peter Dinklage</p>
        <p className="character-name">Tyrion</p>
      </div>
    </div>
  );
}

export default CastItem;