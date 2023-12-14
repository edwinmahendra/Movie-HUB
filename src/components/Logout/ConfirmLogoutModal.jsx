import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const ConfirmLogoutModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
        handleClose();
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        handleClose();
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logoff</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log off?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logoff
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmLogoutModal;