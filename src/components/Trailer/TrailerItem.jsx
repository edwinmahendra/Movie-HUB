import React from 'react';
import './trailer.css';

const TrailerItem = () => {
    const videoId = "giYeaKsXnsI";// Hardcoded videoId

    return (
        <div className="trailer-card">
            <iframe className="trailer-video"
                src={`https://www.youtube.com/embed/${videoId}?si=Z8yUHFsTM7r-Qehk`}
                title="Trailer Movie"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
            <div className="trailer-title">Trailer Movie</div>
        </div>
    );
};

export default TrailerItem;