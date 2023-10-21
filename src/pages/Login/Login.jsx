import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login">
      <img className="aatbio-com-image" alt="Aatbio com image" src={logo} />
      <div className="login-content">
        <div className="overlap">
          <div className="text-wrapper-5">Sign in</div>
          <div className="overlap-group">
            <input className="input" type="email" placeholder="Email" />

            <div className="password-wrapper">
              <input
                className="input password-input"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
              />
              <img
                className="toggle-password"
                src={passwordVisible ? eyeOn : eyeOff}
                alt="toggle visibility"
                onClick={togglePasswordVisibility}
              />
            </div>
            
            <button className="signup-button">Sign in</button>
            <div className="text-wrapper-2">
              New to MovieHub?{" "}
              <span className="text-wrapper-3">Sign Up now.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Login() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
export default Login;