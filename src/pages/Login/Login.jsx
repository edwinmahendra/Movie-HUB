import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
import { useNavigate } from "react-router";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const clickRegister = () => {
    navigate("/register");
  };
  const clickLogin = () => {
    navigate("/");
  };

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
            
            <button className="signup-button" onClick={clickLogin}>Sign in</button>
            <div className="text-wrapper-2">
              New to MovieHub?{" "}
              <span className="text-wrapper-3" onClick={clickRegister}>Sign Up now.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;