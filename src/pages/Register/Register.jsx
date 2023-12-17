import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import "./register.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {}, [isLoading]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^[0-9]{7,15}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      if (!name || !email || !password || !phoneNumber) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (password.length < 4 || password.length > 15) {
        toast.error("Password at least 4-15 characters");
        return;
      }

      if (!validatePhoneNumber()) {
        toast.error(
          "Phone number is not valid. Please enter a valid phone number."
        );
        return;
      }

      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("Username has already been taken");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      if (!validatePhoneNumber()) {
        setIsLoading(false);
        toast.error(
          "Phone number is not valid. Please enter a valid phone number."
        );
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredential.user.uid;
        const docRef = doc(db, "Users", userId);
        const docSnap = await getDocs(docRef);
        if (docSnap.exists()) {
          toast.error("Email has already been taken");
          return;
        }

        await setDoc(doc(db, "Users", userId), {
          name,
          email,
          phoneNumber,
          description: "",
          profilePicture: "",
        });

        const currAuth = getAuth();
        signOut(currAuth)
          .then(() => {
            console.log("Logout successful");
            toast.success("Registration successful!");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Logout failed:", error);
          });

      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email has already been taken");
        } else {
          toast.error("Failed to register. Please try again.");
        }
        console.error("Error in user registration:", error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const moveLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <ToastContainer />
      <img className="aatbio-com-image" alt="Aatbio com image" src={logo} />
      <div className="register-content">
        <div className="overlap">
          <div className="text-wrapper-5">Sign Up</div>
          <div className="overlap-group">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="text-wrapper">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="signup-button" onClick={handleRegister}>
              {isLoading ? (
                <Spinner animation="border" role="status"></Spinner>
              ) : (
                <span>Sign up</span>
              )}
            </button>
            <div className="text-wrapper-2">
              Already have an Account?{" "}
              <span className="text-wrapper-3" onClick={moveLogin}>
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
