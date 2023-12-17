import React, { useState } from 'react';
import searchIcon from "../../assets/search.svg";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className="overlap-group2">
            <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />
            <img 
                src={searchIcon} 
                alt="Search" 
                className="search-instance" 
                onClick={handleSearchSubmit}
            />
        </div>
    );
};

export default SearchBar;