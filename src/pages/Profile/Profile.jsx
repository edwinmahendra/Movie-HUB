import "./Profile.css";
import EditProfile from "../../components/Profile/EditProfile";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
            <EditProfile />

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

export default Profile;
