import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./EditProfile.css";
import { Modal } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";
import InputPassword from "./InputPassword.jsx";

const EditProfile = ({ onFormDataChange, onPasswordReset }) => {
  const auth = getAuth();
  const db = getFirestore();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowResetDialog = () => setShowResetDialog(true);
  const handleCloseResetDialog = () => setShowResetDialog(false);

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

  const handleResetPassword = () => {
    handleCloseResetDialog(); 
    setIsLoading(true); 
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        console.log("Password reset email sent.");
        signOut(auth).then(() => {
          setIsLoading(false);
          window.location.href = "/login";
        }).catch((error) => {
          console.error("Error during sign out: ", error);
          setIsLoading(false); 
        });
        if (onPasswordReset) {
          onPasswordReset(true, null);
        }
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        setIsLoading(false); 
        if (onPasswordReset) {
          onPasswordReset(false, error);
        }
      });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PropagateLoader size={30} color="#6680C0" />
      </div>
    );
  }

  return (
    <Container className="me-1" style={{width: '100%'}}>
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

      <Row className="mt-4 align-items-center">
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
        <Col xs={12} md={3} className="mt-3 mt-md-0">
          {" "}
          <Button
            className="reset-password-btn w-100"
            onClick={handleShowResetDialog}
          >
            Reset Password
          </Button>
        </Col>
      </Row>
      <Modal show={showResetDialog} onHide={handleCloseResetDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset your password? An email will be sent
          with instructions. And from now you will be logged off automatically.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResetDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProfile;