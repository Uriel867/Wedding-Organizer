import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const SupplierRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    businessNameText: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/suppliers/all")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "businessName" && value !== "custom") {
      setFormData({ ...formData, businessName: value, businessNameText: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    const businessNameToSend =
      formData.businessName === "custom"
        ? formData.businessNameText
        : formData.businessName;
    try {
      const response = await fetch("http://localhost:8000/suppliers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessNameToSend,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Supplier registration successful!");
        if (data.vendor && data.vendor.id) {
          localStorage.setItem("supplierId", data.vendor.id);
        }
        // If supplier was selected from the list, redirect to KYC start page to edit existing info
        setTimeout(() => navigate("/supplier-kyc-start"), 1200);
        return;
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
        <select
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
          className="register-input"
          style={{ marginBottom: "16px" }}
        >
          <option value="" disabled hidden>
            Business Name
          </option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.buisness_name}>
              {s.buisness_name}
            </option>
          ))}
          <option value="custom">New Supplier (not in list)</option>
        </select>
        {formData.businessName === "custom" && (
          <input
            type="text"
            name="businessNameText"
            placeholder="Enter new supplier name"
            value={formData.businessNameText || ""}
            onChange={handleChange}
            className="register-input"
            style={{ marginBottom: "16px" }}
            required
          />
        )}
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
        <p className="terms" style={{ marginTop: 16, marginBottom: 0 }}>
          By signing up, you agree to our
          <a href="#" className="link-text" onClick={e => {e.preventDefault(); alert('Terms of Service not implemented yet')}}>Terms of Service</a>
          and
          <a href="#" className="link-text" onClick={e => {e.preventDefault(); alert('Privacy Policy not implemented yet')}}>Privacy Policy</a>.
        </p>
      </form>
      <p className="signin-link">
        Already have a supplier account? <a href="/supplier-login">Sign In</a>
      </p>
    </div>
  );
};

export default SupplierRegisterPage;