// listBookmark.jsx
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import sampleImage from "../../assets/sampleImage.jpg";
import sampleImage2 from "../../assets/sampleImage2.jpg";
import sampleImage3 from "../../assets/sampleImage3.jpg";
import bookmarkon from '../../assets/bookmark.svg';
import bookmarkoff from '../../assets/bookmark-off.svg';

import "./listBookmark.css";

const ListBookmark = ({ sorting }) => {
  const [bookmarks, setBookmarks] = useState([
    {
      title: "Conjuring (2013)",
      date: "2013-08-31",
      sinopsis:
        "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse. Forced to confront a powerful entity, the Warrens find themselves caught in the most terrifying case of their lives.",
      dateAdded: "2023-08-29",
      isBookmarked: true,
      image: sampleImage,
    },
    {
      title: "Strays (2023)",
      date: "2023-08-17",
      sinopsis:
        "When Reggie is abandoned on the mean city streets by his lowlife owner, Doug, Reggie is certain that his beloved owner would never leave him on purpose.",
      dateAdded: "2023-08-31",
      isBookmarked: true,
      image: sampleImage3,
    },
    {
      title: "Zonjuring 2(2016)",
      date: "2016-06-26",
      sinopsis:
        "Lorraine and Ed Warren travel to north London to help a single mother raising four children alone in a house plagued by malicious spirits.",
      dateAdded: "2023-08-30",
      isBookmarked: true,
      image: sampleImage2,
    },

  ]);

  const toggleBookmark = (index) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index].isBookmarked = !updatedBookmarks[index].isBookmarked;
    setBookmarks(updatedBookmarks);
  };

  const sortBookmarks = (sortingType) => {
    const sortedBookmarks = [...bookmarks];

    if (sortingType === "alphabet") {
      sortedBookmarks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingType === "date") {
      sortedBookmarks.sort((a, b) => a.date.localeCompare(b.date));
    }
    else if (sortingType === "dateAdded"){
      sortedBookmarks.sort((b, a) => a.dateAdded.localeCompare(b.dateAdded));

    }

    return sortedBookmarks;
  };

  const sortedBookmarks = sortBookmarks(sorting || "dateAdded");

  return (
    <>
      {sortedBookmarks.map((bookmark, index) => (
        <Card className="image" key={index}>
          <Card.Img className="posterImg" variant="top" src={bookmark.image} alt="Poster" />
          <Card.Body id="body">
            <Card.Title id="title">
              {bookmark.title}
              <img
                className="bookmark"
                src={bookmark.isBookmarked ? bookmarkon : bookmarkoff}
                onClick={() => toggleBookmark(index)}
              />
            </Card.Title>

            <Card.Text id="movie-date">
              {new Date(bookmark.date).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
            <Card.Text id="sinopsis">{bookmark.sinopsis}</Card.Text>
            <Card.Text id="date-added">
              <b>Date Added:</b> {new Date(bookmark.dateAdded).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
export default ListBookmark;
