import React from 'react';
import SearchResultItem from './SearchResultsItem';
import './SearchResults.css';

const SearchResult = ({ movies }) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500"; // Adjust the size if needed

    if (movies.length === 0) {
        return <p>No results found</p>;
    }

    console.log(movies.map(movie => baseUrl + movie.poster_path));

    return (
        <div className="search-results-container">
            {movies.map(movie => (
                <SearchResultItem 
                    key={movie.id} 
                    idMovie={movie.id}
                    title={movie.title} 
                    imageUrl={baseUrl + movie.poster_path} // Prepend base URL here
                    releasedDate={movie.release_date} 
                    description={movie.overview}
                />
            ))}
        </div>
    );
};

export default SearchResult;