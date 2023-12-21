import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import "./register.css";
import logo from "../../assets/logo.svg";
import eyeOn from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import ButtonBackHome from "../../components/Profile/ButtonBackHome";
import { PropagateLoader } from "react-spinners";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

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
    try{
      if (!name || !email || !password || !phoneNumber) {
        toast.error("Please fill in all fields.");
        return;
      }
  
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
  
      if (password.length < 6 || password.length > 15) {
        toast.error("Password must be 6-15 characters long");
        return;
      }
  
      if (!validatePhoneNumber()) {
        toast.error(
          "Phone number is not valid. Please enter a valid phone number."
        );
        return;
      }
  
      const usersRef = collection(db, "Users");
      const usernameQuery = query(usersRef, where("name", "==", name)); 
      const usernameQuerySnapshot = await getDocs(usernameQuery);
      console.log(usernameQuerySnapshot);
      if (!usernameQuerySnapshot.empty) {
        toast.error("Username is already taken");
        return;
      }
  
      try {
        setIsLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredential.user.uid;
  
        await setDoc(doc(db, "Users", userId), {
          name,
          email,
          phoneNumber,
          description: "",
          profilePicture: "",
        });

        // await signOut(getAuth());
        setJustRegistered(true); 
        // moveLogin();
      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already in use.";
        }
        toast.error(errorMessage);
        console.error("Error in user registration:", error);
      } 
    }catch(err){
      console.error(err);
    }finally{
      setIsLoading(false);
    }
  };

  const moveLogin = () => {
    navigate("/login");
  };

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <PropagateLoader size={30} color="#6680C0" />
  //     </div>
  //   );
  // }

  return (
    <div className="register">
      <ToastContainer />
      <div className="btn-home-container-register">
        <ButtonBackHome />
      </div>
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
                maxLength={13}
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
