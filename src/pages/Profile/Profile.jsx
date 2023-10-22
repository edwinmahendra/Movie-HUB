import "./Profile.css";
import EditProfile from "../../components/Profile/EditProfile";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonBackHome from "../../components/Profile/ButtonBackHome";

const Profile = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    showCancelToast();
  };
  const handleSave = () => {
    showSuccessToast();
  };

  const showSuccessToast = () => {
    toast.success('Profile Updated Successfully', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const showCancelToast = () => {
    toast.error('Edit Profile Cancelled', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="header-profile">
        <ButtonBackHome />
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
