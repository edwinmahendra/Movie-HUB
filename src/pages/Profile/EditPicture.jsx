import "./Profile.css";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import EditProfilePicture from "../../components/Profile/EditProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditPicture = () => {
  const navigate = useNavigate();
  const handleCancel = () => navigate("/profile");
  const handleSave = () => navigate("/profile");
  
  return (
    <div>
      <div className="header-profile">
        <ProfilePicture />
      </div>

      <div className="body-profile">
        <div className="field-edit-profile p-4">
            <EditProfilePicture />

            <Row className="mt-5">
                <Col></Col>
                <Col className="d-flex flex-row-reverse me-4">
                    <Button variant="success" className="btn-save-profile" onClick={handleSave}>Save</Button>
                    <Button variant="primary" className="btn-cancel-profile" onClick={handleCancel}>Cancel</Button>
                </Col>
            </Row>
        </div>
      </div>
    </div>
  );
};

export default EditPicture;
