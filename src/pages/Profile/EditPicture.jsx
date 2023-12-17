import "./Profile.css";
import EditProfilePicture from "../../components/Profile/EditProfilePicture";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import ProfilePicturePreview from '../../components/Profile/ProfilePicturePreview';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const EditPicture = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to hold the uploaded image URL
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    // Fetch the current user's profile picture URL from Firestore on component mount
    const fetchProfilePic = async () => {
      const userDocRef = doc(db, 'Users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      console.log('Current user:', auth.currentUser);

      if (userDocSnap.exists()) {
        setImageUrl(userDocSnap.data().profilePicture);
      }
    };

    fetchProfilePic();
  }, [auth.currentUser, db]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleRemovePicture = () => {
    setImageUrl(null);
    setSelectedFile(null);
};

  const handleSave = async () => {
    if (selectedFile) {
      const imageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      uploadBytes(imageRef, selectedFile).then((uploadSnapshot) => {
        getDownloadURL(uploadSnapshot.ref).then((url) => {
          // Update user's profile picture URL in Firestore
          const userDocRef = doc(db, 'Users', auth.currentUser.uid);
          updateDoc(userDocRef, { profilePicture: url }).then(() => {
            setImageUrl(url); // Update the local state with the new image URL
            showSuccessToast();
            navigate('/profile');
          });
        });
      }).catch((error) => {
        toast.error('Failed to upload image.', { position: toast.POSITION.TOP_RIGHT });
      });
    } else {
      showSuccessToast();
    }
  };

  const showSuccessToast = () => {
    toast.success('Profile Picture Updated Successfully', { position: toast.POSITION.TOP_RIGHT });
  };

  const showCancelToast = () => {
    toast.error('Profile Picture Update Cancelled', { position: toast.POSITION.TOP_RIGHT });
    navigate('/profile');
  };

  return (
    <div>
      <ToastContainer />
      <div className="header-profile">
        <ButtonBackHome />
        {/* Pass the imageUrl to the ProfilePicture component */}
        <ProfilePicturePreview imageUrl={imageUrl} imageFile={selectedFile} />
      </div>

      <div className="body-profile">
        <div className="field-edit-profile p-4">
        <EditProfilePicture 
                onFileSelect={handleFileSelect} 
                onRemovePicture={handleRemovePicture} // Pass the handler here
            />

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

export default EditPicture;