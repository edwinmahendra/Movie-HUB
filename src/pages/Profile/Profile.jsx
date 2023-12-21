import React, { useState, useEffect, useRef } from "react";
import EditProfile from "../../components/Profile/EditProfile";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { PropagateLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [profileData, setProfileData] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [initialData, setInitialData] = useState({});
  const handleShowResetDialog = () => setShowResetDialog(true);
  const handleCloseResetDialog = () => setShowResetDialog(false);
  const [validateEditProfile, setValidateEditProfile] = useState(
    () => () => true
  );
  const editProfileRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setProfileImageUrl(data.profilePicture);
            setInitialData(data);
            setProfileData(data);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
        })
        .finally(() => {
          setIsLoading(false); // Hentikan loading setelah data didapat
        });
    }
  }, [auth, db]);

  const handleFormDataChange = (newData) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
  };

  const isDataChanged = () => {
    return JSON.stringify(profileData) !== JSON.stringify(initialData);
  };

  const handleValidation = (isValid) => {
    setIsFormValid(isValid);
  };

  const handleSave = () => {
    if (editProfileRef.current && editProfileRef.current.validateFields) {
      const errorMessage = editProfileRef.current.validateFields();
      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }
    }


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
      toast.success(
        "Password reset email sent successfully. Please check your inbox."
      );
    } else if (error) {
      toast.error(`Failed to send password reset email: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <PropagateLoader size={30} color="#6680C0" />
      </div>
    );
  }

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
            ref={editProfileRef}
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
                disabled={!isDataChanged()}
              >
                Save
              </Button>
              <Button
                variant="primary"
                className="btn-cancel-profile"
                onClick={handleCancel}
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
