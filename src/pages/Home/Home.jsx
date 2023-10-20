import React, {useState} from "react";
import "./home.css";
import NowPlayingItem from "../../components/Movie/NowPlayingItem";
import PopularUpcomingItem from "../../components/Movie/PopularUpcomingItem";
import TopRated from "../../components/Movie/TopRatedItem";
import { Button, InputGroup, Form } from "react-bootstrap";

export default function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        <div className="search-input">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              className="shadow-none"
            />
            <Button variant="primary" id="button-search" className="shadow-none">
              🔍
            </Button>
          </InputGroup>
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Now Playing 🍿</p>
          <Button variant="link" onClick={handleShow}>See More {">"}</Button>
        </div>
        <div className="container-now-playing">
          <NowPlayingItem />
          <NowPlayingItem />
          <NowPlayingItem />
          <NowPlayingItem />
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Popular</p>
          <Button variant="link" onClick={handleShow}>See More {">"}</Button>
        </div>
        <div className="container-popular">
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Top Rated</p>
          <Button variant="link" onClick={handleShow}>See More {">"}</Button>
        </div>
        <div className="container-top-rated">
          <TopRated />
          <TopRated />
          <TopRated />
          <TopRated />
          <TopRated />
          <TopRated />
          <TopRated />
        </div>

        <div className="title-section">
          <p className="text-light fs-4 fw-bold">Upcoming</p>
          <Button variant="link" onClick={handleShow}>See More {">"}</Button>
        </div>
        <div className="container-upcoming">
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
          <PopularUpcomingItem />
        </div>
      </div>
    );
}