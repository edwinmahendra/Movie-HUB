import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import axios from "axios";

const FilterMovie = ({ show, hide, handleApplyGenres }) => {
  const [genres, setGenres] = useState([]);
  const [appliedGenres, setAppliedGenres] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_MOVIE_TOKEN}` },
  };

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL_MOVIE}genre/movie/list?language=en`,
        config
      );
      setGenres(res.data.genres);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenreChange = (genre) => {
    setAppliedGenres(genre);
  };

  return (
    <div>
      <Modal show={show} onHide={hide} className="modal-filter">
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Genres</h5>
          <ToggleButtonGroup
            type="checkbox"
            value={appliedGenres}
            onChange={handleGenreChange}
            className="d-flex flex-wrap align-items-end mt-auto"
          >
            {genres.map((genre) => {
              return (
                <ToggleButton
                  id={`tbg-btn-${genre.id}`}
                  key={genre.id}
                  value={genre.id}
                  variant={
                    appliedGenres.includes(genre.id)
                      ? "primary"
                      : "outline-dark"
                  }
                  className="m-1 rounded"
                >
                  {genre.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleApplyGenres(appliedGenres)}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FilterMovie;
