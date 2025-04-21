import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "./LoginPage.css";
import axios from "axios";
import mcdonalndsImg from "./images/mcdonlads.jpg";
import googleLogo from "./images/google-logo.png";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import icons

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "kyc") {
        localStorage.setItem("userEmail", email); // Store the email in local storage
        setErrorMessage(""); // Clear any previous error
        setSuccessMessage("Redirecting to KYC...");
        navigate("/kyc-flower"); // Redirect to KYC Location Page
      } else if (response.data.status === "suppliers") {
        localStorage.setItem("userEmail", email); // Store the email in local storage
        setErrorMessage(""); // Clear any previous error
        setSuccessMessage("Redirecting to wedding suppliers...");
        navigate("/wedding-suppliers"); // Redirect to Wedding Suppliers Page
      } else {
        setSuccessMessage(""); // Clear any previous success message
        setErrorMessage(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSuccessMessage(""); // Clear any previous success message
      setErrorMessage("Invalid email or password"); // Set error message
    }
  };

  return (
    <div className="Landing-Page">
      <div className="headline">
        <h1>Find your perfect wedding suppliers</h1>
      </div>
      <div className="login-image">
        <img src={mcdonalndsImg} alt="Wedding" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="sign-in" type="submit">
            Sign In
          </button>
        </form>

        {/* Display success message */}
        {successMessage && (
          <p className="success-message">
            <FaCheckCircle style={{ marginRight: "8px" }} />
            {successMessage}
          </p>
        )}

        {/* Display error message */}
        {errorMessage && (
          <p className="error-message">
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            {errorMessage}
          </p>
        )}

        <div className="social-login">
          <button className="gsi-circle-button">
            <div className="gsi-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 
           30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 
           13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 
           2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 
           7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98
           -6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 
           10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 
           2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 
           6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
          </button>

          <button className="facebook-circle-button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt="Facebook logo"
            />
          </button>
        </div>

        {/* Add the Register button */}
        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;