import search from "../../assets/search.svg";
import "./searchBar.css";

const SearchBar = () => {
    return (
        <div className="overlap-group2">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <img src={search} alt="Search" className="search-instance" />
        </div>
    )
};

export default SearchBar;