import React, { useState, useEffect } from "react";
import EditProfile from "../../components/Profile/EditProfile";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [profileData, setProfileData] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const handleShowResetDialog = () => setShowResetDialog(true);
  const handleCloseResetDialog = () => setShowResetDialog(false);

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      console.log("Current user:", auth.currentUser);
      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setProfileImageUrl(docSnapshot.data().profilePicture);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
        });
    }
  }, [auth, db]);

  const handleFormDataChange = (newData) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleSave = () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      updateDoc(userDocRef, profileData)
        .then(() => {
          toast.success("Profile Updated Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.error("Error updating profile: ", error);
          toast.error("Failed to update profile.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const handlePasswordReset = (success, error) => {
    if (success) {
      toast.success("Password reset email sent successfully. Please check your inbox.");
    } else if (error) {
      toast.error(`Failed to send password reset email: ${error.message}`);
    }
  };

  const showCancelToast = () => {
    toast.error("Edit Profile Cancelled", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="header-profile">
        <ButtonBackHome />
        <ProfilePicture imageUrl={profileImageUrl} />
      </div>

      <div className="body-profile">
        <div className="field-edit-profile p-4">
        <EditProfile
            onSave={handleSave}
            onFormDataChange={handleFormDataChange}
            onPasswordReset={handlePasswordReset}
          />
          <Row className="mt-5">
            <Col></Col>
            <Col className="d-flex flex-row-reverse me-4">
              <Button
                variant="success"
                className="btn-save-profile"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="primary"
                className="btn-cancel-profile"
                onClick={showCancelToast}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;