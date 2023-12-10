import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./EditProfile.css";
import InputPassword from "./InputPassword.jsx";

const EditProfile = ({ onFormDataChange }) => {
  const auth = getAuth();
  const db = getFirestore();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    description: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          }
        })
        .catch((error) => {
          console.error("Error fetching profile: ", error);
        });
    }
  }, [auth, db]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (onFormDataChange) {
      onFormDataChange({ [id]: value });
    }
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="edit-input-styling"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="edit-input-styling"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="edit-input-styling"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
          <Form.Control
            type="text"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="edit-input-styling"
          />
        </Col>
        <Col>
          <InputPassword />
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;