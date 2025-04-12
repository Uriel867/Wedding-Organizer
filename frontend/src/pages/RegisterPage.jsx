import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName, // Match the backend schema
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/login"; // Redirect to login page
      } else {
        alert(data.detail || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="register-container">
      <h1 className="brand-title">Wedding Supplier<br /><strong>Matcher</strong></h1>
      <h2>Create your account</h2>
      <p>Find your perfect wedding suppliers</p>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
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

        <button type="submit" className="create-account-button">Create Account</button>
      </form>

      <p className="terms">
        By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </p>

      <p className="signin-link">
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
};

export default RegisterPage;
