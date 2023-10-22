import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './EditProfile.css'

const InputPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form.Label htmlFor="editPassword">Password</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          aria-label="Password"
          id="editPassword"
          className="edit-input-styling"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          {showPassword ?  <FaEyeSlash /> : <FaEye /> }
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default InputPassword;
