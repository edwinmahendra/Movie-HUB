import "./Profile.css";
import EditProfilePicture from "../../components/Profile/EditProfilePicture";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import ProfilePicturePreview from "../../components/Profile/ProfilePicturePreview";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const EditPicture = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfilePic = async () => {
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      console.log("Current user:", auth.currentUser);

      if (userDocSnap.exists()) {
        setImageUrl(userDocSnap.data().profilePicture);
      }
    };

    fetchProfilePic();
  }, [auth.currentUser, db]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const defaultImage =
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const handleRemovePicture = async () => {
    setSelectedFile(null);
    setImageUrl(defaultImage);
  };

  const handleSave = async () => {
    if (selectedFile) {
      const imageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      uploadBytes(imageRef, selectedFile)
        .then((uploadSnapshot) => {
          getDownloadURL(uploadSnapshot.ref).then((url) => {
            const userDocRef = doc(db, "Users", auth.currentUser.uid);
            updateDoc(userDocRef, { profilePicture: url }).then(() => {
              setImageUrl(url);
              toast.success("Profile Picture Updated Successfully", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => navigate("/profile"), 3000);
            });
          });
        })
        .catch((error) => {
          toast.error("Failed to upload image.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      toast.success("Profile Picture Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => navigate("/profile"), 3000);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
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
            onRemovePicture={handleRemovePicture}
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

export default EditPicture;
