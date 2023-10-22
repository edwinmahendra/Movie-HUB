import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "./EditProfile.css";
import InputPassword from "./InputPassword.jsx";

const EditProfile = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h4 className="fw-bold">User Profile</h4>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Label htmlFor="editEmail">Email</Form.Label>
            <Form.Control
              type="email"
              id="editEmail"
              placeholder="name@example.com"
              className="edit-input-styling"
            />
          </Col>

          <Col>
            <Form.Label htmlFor="editName">Name</Form.Label>
            <Form.Control
              type="password"
              id="editName"
              placeholder="Edward Elric"
              className="edit-input-styling"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Form.Label htmlFor="editDescription">Description</Form.Label>
            <Form.Control
              as="textarea"
              id="editDescription"
              placeholder="Description"
              rows={4}
              className="edit-input-styling"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Form.Label htmlFor="editPhone">Phone Number</Form.Label>
            <Form.Control
              type="text"
              id="editPhone"
              placeholder="08123456789"
              className="edit-input-styling"
            />
          </Col>
          <Col>
            <InputPassword />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditProfile;
