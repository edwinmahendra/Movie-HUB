import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditProfilePicture = ({ onFileSelect, onRemovePicture }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            onFileSelect(file); 
        }
    };
  
    const handleRemove = () => {
        setSelectedFile(null);  
        onRemovePicture();      
    };

    return (
        <div style={{ width: '80%' }}>
            <h4 className="fw-bold">Change Profile Picture</h4>
            <p>Just click the 'Choose file...' button and choose the image from your computer.</p>
            <h6 className="fw-semibold">Maximum image size 2 MB</h6>
            <Form.Group controlId="formFile" className="mt-3 mb-3" style={{ width: '45%' }}>
                <Form.Control 
                  type="file" 
                  className="edit-input-styling" 
                  onChange={handleFileChange} 
                  value={selectedFile ? undefined : ''} // Reset file input when file is removed
                />
            </Form.Group>
            <p className="mt-2 mb-2">or you can remove your current profile picture.</p>
            <Button 
                variant="dark" 
                className="mt-2 mb-2" 
                style={{ width: '45%' }} 
                onClick={handleRemove}>
                Remove Picture
            </Button>
        </div>
    );
};

export default EditProfilePicture;