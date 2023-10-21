import React from 'react';
import sampleImage from '../../assets/sample_poster_land.jpg';
import './RecommendationItem.css'

const RecommendationItem = () => {
    console.log("Rendering RecommendationItem");
    return (
        
        <div className="recommendation-card">
          <div className="recommendation-image" style={{ backgroundImage: `url(${sampleImage})` }}></div>
          <div className="recommendation-details">
            <p className="movie-title">One Piece Red</p>
            <p className="recommendation-percentage">Similarity 85%</p>
          </div>
        </div>
      );
};

export default RecommendationItem;