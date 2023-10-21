import React, { useState } from "react";
import "./register.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";

export const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^[0-9][0-9]{7,15}$/;

    if (phonePattern.test(phoneNumber)) {
      // Phone number is valid
    } else {
      // Phone number is not valid
      alert("Phone number is not valid. Please enter a valid phone number.");
    }
  };

  return (
    <div className="register">
      <img className="aatbio-com-image" alt="Aatbio com image" src={logo} />
      <div className="register-content">
        <div className="overlap">
          <div className="text-wrapper-5">Sign Up</div>
          <div className="overlap-group">
            <input
              className="input"
              type="text"
              placeholder="Name"
            />
            <div className="text-wrapper">
              <input
                className="input"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="text-wrapper">
              <input
                className="input"
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="password-wrapper">
              <input
                className="password-input"
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
            <button className="signup-button" onClick={validatePhoneNumber}>
              Sign up
            </button>
            <div className="text-wrapper-2">
              Already have an Account?{" "}
              <span className="text-wrapper-3">Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;