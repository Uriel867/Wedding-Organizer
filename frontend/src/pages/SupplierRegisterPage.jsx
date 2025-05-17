import React, { useState } from "react";
import "./RegisterPage.css";

const SupplierRegisterPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/suppliers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: formData.businessName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Supplier registration successful!");
        setFormData({ businessName: "", email: "", password: "", confirmPassword: "" });
      } else {
        setErrorMessage(data.detail || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1 className="brand-title">Wedding Supplier<br /><strong>Matcher</strong></h1>
      <h2>Register as a Supplier</h2>
      <p>Grow your business and reach more couples!</p>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Business Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>👁️</span>
        </div>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁️</span>
        </div>
        <button type="submit" className="create-account-button">Register</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p className="terms">
        By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </p>
      <p className="signin-link">
        Already have a supplier account? <a href="/supplier-login">Sign In</a>
      </p>
    </div>
  );
};

export default SupplierRegisterPage;