import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import sampleImage from "../../assets/sampleImage.jpg";
import sampleImage2 from "../../assets/sampleImage2.jpg";
import sampleImage3 from "../../assets/sampleImage3.jpg";
import bookmark from '../../assets/bookmark.svg';
import bookmarkoff from '../../assets/bookmark-off.svg';

import "./listBookmark.css";

const ListBookmark = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
      setIsBookmarked(!isBookmarked);
    };
  return (
    <>
      <Card className="image">
        <Card.Img
          className="posterImg"
          variant="top"
          src={sampleImage}
          alt="Poster"
        />
        <Card.Body id="body">
          <Card.Title id="title">
            Conjuring (2013)
            <img
            className="bookmark"
            src={isBookmarked ? bookmarkoff : bookmark}
            onClick={toggleBookmark}
          />
          </Card.Title>

          <Card.Text id="movie-date"> Aug 31, 2013 </Card.Text>
          <Card.Text id="sinopsis">
            Paranormal investigators Ed and Lorraine Warren work to help a
            family terrorized by a dark presence in their farmhouse. Forced to
            confront a powerful entity, the Warrens find themselves caught in
            the most terrifying case of their lives.{" "}
          </Card.Text>
          <Card.Text id="date-added">
            <b>Date Added:</b> August 29, 2023
          </Card.Text>

        </Card.Body>
      </Card>
      <Card className="image">
        <Card.Img
          className="posterImg"
          variant="top"
          src={sampleImage2}
          alt="Poster"
        />
        <Card.Body>
          <Card.Title id="title">
            Conjuring 2(2016)           
          <img
            className="bookmark"
            src={isBookmarked ? bookmarkoff : bookmark}
            onClick={toggleBookmark}
          />
          </Card.Title>

          <Card.Text id="movie-date"> June 26, 2016 </Card.Text>
          <Card.Text id="sinopsis">
            Lorraine and Ed Warren travel to north London to help a single
            mother raising four children alone in a house plagued by malicious
            spirits..{" "}
          </Card.Text>
          <Card.Text id="date-added">
            <b>Date Added:</b> August 29, 2023
          </Card.Text>

        </Card.Body>
      </Card>

      <Card className="image">
        <Card.Img
          className="posterImg"
          variant="top"
          src={sampleImage3}
          alt="Poster"
        />
        <Card.Body>
          <Card.Title id="title">
            Strays (2023)
            <img
            className="bookmark"
            src={isBookmarked ? bookmarkoff : bookmark}
            onClick={toggleBookmark}
          />
          </Card.Title>

          <Card.Text id="movie-date"> August 17, 2023 </Card.Text>
          <Card.Text id="sinopsis">
            When Reggie is abandoned on the mean city streets by his lowlife
            owner, Doug, Reggie is certain that his beloved owner would never
            leave him on purpose. But once Reggie falls in with Bug, a
            fast-talking, foul-mouthed stray who loves his freedom and believes
            that owners are for suckers, Reggie finally realizes he was in a
            toxic relationship and ...
          </Card.Text>
          <Card.Text id="date-added">
            <b>Date Added:</b> August 29, 2023
          </Card.Text>

        </Card.Body>
      </Card>
    </>
  );
};

export default ListBookmark;