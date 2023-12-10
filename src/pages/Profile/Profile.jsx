import React, { useState, useEffect } from "react";
import EditProfile from "../../components/Profile/EditProfile";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [profileData, setProfileData] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    // Make sure the user is authenticated
    if (auth.currentUser) {
      const userRef = doc(db, 'Users', auth.currentUser.uid);

      // Fetch the document for the current user
      getDoc(userRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Set the profile image URL state
          setProfileImageUrl(docSnapshot.data().profilePicture);
        } else {
          // Handle the case where the document does not exist
          console.log('No such document!');
        }
      }).catch((error) => {
        // Handle any errors
        console.error('Error fetching profile picture:', error);
      });
    }
  }, [auth, db]);

  const handleFormDataChange = (newData) => {
    setProfileData(prevData => ({ ...prevData, ...newData }));
  };

  const handleSave = () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      updateDoc(userDocRef, profileData).then(() => {
        toast.success('Profile Updated Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
      }).catch(error => {
        console.error("Error updating profile: ", error);
        toast.error('Failed to update profile.', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
    }
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
        <ProfilePicture imageUrl={profileImageUrl} />
      </div>

      <div className="body-profile">
        <div className="field-edit-profile p-4">
          <EditProfile onSave={handleSave} onFormDataChange={handleFormDataChange} />

          <Row className="mt-5">
            <Col></Col>
            <Col className="d-flex flex-row-reverse me-4">
              <Button variant="success" className="btn-save-profile" onClick={handleSave}>Save</Button>
              <Button variant="primary" className="btn-cancel-profile" onClick={showCancelToast}>Cancel</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;