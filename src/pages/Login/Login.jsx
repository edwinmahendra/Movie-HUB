import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const clickLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/"); 
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
      console.error("Error in user login:", error);
    }
  };

  const clickRegister = () => {
    navigate("/register");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login">
      <ToastContainer />
      <img className="aatbio-com-image" alt="Aatbio com image" src={logo} />
      <div className="login-content">
        <div className="overlap">
          <div className="text-wrapper-5">Sign in</div>
          <div className="overlap-group">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-wrapper">
              <input
                className="input password-input"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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