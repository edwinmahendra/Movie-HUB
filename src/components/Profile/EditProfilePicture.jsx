import { Form, Button } from "react-bootstrap";

const EditProfilePicture = () => {
    return (
        <div style={{width: "80%"}}>
            <h4 className="fw-bold">Change Profile Picture</h4>
            <p >Just click the 'Choose file...' button and choose the image from your computer.
Use the file selector below to upload you own custom avatar. We will automatically crop your image to be a square if it's not already.</p>
            <h6 className="fw-semibold">Maximum image size 2 MB</h6>
            <Form.Group controlId="formFile" className="mt-3 mb-3" style={{width: "45%"}}>
                <Form.Control type="file" className="edit-input-styling"/>
            </Form.Group>
            <p className="mt-2 mb-2">or you can remove your current profile picture.</p>
            <Button variant="dark" className="mt-2 mb-2" style={{width: "45%"}}>Remove Picture</Button>
        </div>
    );
};

export default EditProfilePicture;