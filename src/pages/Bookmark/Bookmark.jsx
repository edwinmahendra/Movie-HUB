import React, { useState } from "react";
import "./bookmark.css";
import ListBookmark from "../../components/Movie/ListBookmark";
import {Dropdown, DropdownButton } from "react-bootstrap";

export const Bookmark = () => {
  const [sorting, setSorting] = useState("dateAdded");

  const handleSorting = (type) => {
    setSorting(type);
  };
  
  return (
    <div>
      <div  className="titlePage">
        My Bookmarks
      </div>
      <div className="sorting-dropdown">
        <DropdownButton id="sorting-dropdown" title="Sort by">
          <Dropdown.Item onClick={() => handleSorting("alphabet")}>Alphabetically</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("date")}>Date</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("dateAdded")}>Date Added</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="container">
        <>
          <ListBookmark sorting={sorting} />
        </>
      </div>
    </div>
  );
};

export default Bookmark;
