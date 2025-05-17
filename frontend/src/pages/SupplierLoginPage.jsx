import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function SupplierLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual supplier login logic
    if (email === "supplier@example.com" && password === "password") {
      setSuccessMessage("Login successful! Redirecting...");
      navigate("/supplier-dashboard", { replace: true }); // Use replace to avoid navigation issues
    } else {
      setErrorMessage("Invalid supplier credentials");
    }
  };

  return (
    <div className="Landing-Page">
      <div className="headline">
        <h1>Welcome Back, Supplier!</h1>
        <p>Please log in to access your supplier dashboard and manage your services.</p>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Supplier Email"
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
            Sign In as Supplier
          </button>
        </form>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        <div className="register-link">
          <p>Don't have a supplier account?</p>
          <Link to="/supplier-register">
            <button className="register-button">Register as Supplier</button>
          </Link>
        </div>
        <div className="register-link">
          <p>Back to user login?</p>
          <Link to="/login">
            <button className="register-button">User Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SupplierLoginPage;