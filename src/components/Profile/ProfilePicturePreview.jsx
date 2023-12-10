import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const ProfilePicturePreview = ({ imageUrl, imageFile }) => {
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : imageUrl;
  const defaultImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <div className="profile-picture-preview">
      <img
        src={previewUrl || defaultImage}
        alt="Profile Preview"
        className="rounded-circle border border-5 d-block"
      />
    </div>
  );
};

export default ProfilePicturePreview;