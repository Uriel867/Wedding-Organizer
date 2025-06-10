import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sectionOptions = [
  { value: "מקומות", label: "Venue" },
  { value: "אוכל", label: "Food" },
  { value: "מוזיקה", label: "Music" },
];

const SupplierKycStartPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    business_name: "",
    category: "",
    section: "",
    address: "",
    phone_number: "",
    website: "",
    food: false,
    wedding_hall: false,
    music: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Fetch current supplier info on mount
  useEffect(() => {
    const supplierId = localStorage.getItem("supplierId");
    const supplierEmail = localStorage.getItem("supplierEmail");
    if (!supplierId || !supplierEmail) {
      navigate("/supplier-login");
      return;
    }
    fetch(`http://localhost:8000/suppliers/${supplierId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          business_name: data.buisness_name ?? "",
          category: data.category ?? "",
          section: data.section ?? "",
          address: data.address ?? "",
          phone_number: data.phone_number ?? "",
          website: data.website ?? "",
          food: data.food === 0 || data.food === 1 || data.food === 2 || data.food === 3 || data.food === 4 || data.food === 5 || data.food === 6 || data.food === 7 || data.food === 8 || data.food === 9,
          wedding_hall: data.wedding_hall === 0 || data.wedding_hall === 1 || data.wedding_hall === 2 || data.wedding_hall === 3 || data.wedding_hall === 4 || data.wedding_hall === 5 || data.wedding_hall === 6 || data.wedding_hall === 7 || data.wedding_hall === 8 || data.wedding_hall === 9,
          music: data.music === 0 || data.music === 1 || data.music === 2 || data.music === 3 || data.music === 4 || data.music === 5 || data.music === 6 || data.music === 7 || data.music === 8 || data.music === 9,
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // At least one business type must be checked
    if (!form.food && !form.wedding_hall && !form.music) {
      setError("Please select at least one business type.");
      return;
    }
    // Ensure the checkbox matching the selected section is checked
    const sectionToCheckbox = {
      "אוכל": "food",
      "מקומות": "wedding_hall",
      "מוזיקה": "music",
    };
    const requiredCheckbox = sectionToCheckbox[form.section];
    if (requiredCheckbox && !form[requiredCheckbox]) {
      setError(`The checkbox for the selected section ("${sectionOptions.find(opt => opt.value === form.section)?.label}") must be checked.`);
      return;
    }
    // Prepare update payload
    const payload = {
      business_name: form.business_name,
      category: form.category,
      section: form.section,
      address: form.address,
      phone_number: form.phone_number,
      website: form.website,
      food: form.food ? 0 : undefined,
      wedding_hall: form.wedding_hall ? 0 : undefined,
      music: form.music ? 0 : undefined,
    };
    const supplierId = localStorage.getItem("supplierId");
    try {
      const res = await fetch(`http://localhost:8000/suppliers/${supplierId}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess("Profile updated!");
        // Determine the first service to complete KYC for and any subsequent services
        const services = [];
        if (form.food) services.push('food');
        if (form.music) services.push('music');
        if (form.wedding_hall) services.push('venue');

        if (services.length === 0) {
          // This shouldn't happen due to earlier validation, but handle it just in case
          navigate("/supplier-dashboard");
          return;
        }

        // First service determines the initial route
        const firstService = services[0];
        const remainingServices = services.slice(1);
        
        // Build the navigation URL
        let navigationUrl = `/supplier-kyc-${firstService}`;
        if (remainingServices.length > 0) {
          navigationUrl += `?next=${remainingServices.join(',')}`;
        }

        // Navigate after a short delay to allow the success message to be seen
        setTimeout(() => navigate(navigationUrl), 1200);
      } else {
        let data;
        try {
          data = await res.json();
        } catch (e) {
          data = { detail: "Update failed." };
        }
        setError(data.detail || data.msg || JSON.stringify(data) || "Update failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  // Logout button handler
  const handleLogout = () => {
    localStorage.removeItem("supplierId");
    localStorage.removeItem("supplierEmail");
    navigate("/supplier-login");
  };

  // Redo KYC handler for supplier
  const handleRedoKyc = async () => {
    const supplierId = localStorage.getItem("supplierId");
    if (!supplierId) {
      handleLogout();
      return;
    }
    try {
      await fetch(`http://localhost:8000/suppliers/${supplierId}/reset-kyc`, { method: "POST" });
      navigate("/supplier-kyc-start");
    } catch (error) {
      alert("Failed to reset supplier KYC. Please try again.");
    }
  };

  return (
    <div className="kyc-supplier-container" style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 10px #eee" }}>
      <h2>Complete Your Business Profile</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button className="purple-button" onClick={handleLogout}>Logout</button>
        <button className="purple-button" onClick={handleRedoKyc}>Redo KYC</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Business Name</label>
        <input name="business_name" value={form.business_name} onChange={handleChange} required className="register-input" />
        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} className="register-input" />
        <label>Section</label>
        <select name="section" value={form.section} onChange={handleChange} required className="register-input">
          <option value="" disabled>Select section</option>
          {sectionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <label>Address</label>
        <input name="address" value={form.address} onChange={handleChange} className="register-input" />
        <label>Phone Number</label>
        <input name="phone_number" value={form.phone_number} onChange={handleChange} className="register-input" />
        <label>Website</label>
        <input name="website" value={form.website} onChange={handleChange} className="register-input" />
        <div style={{ margin: "18px 0 8px 0" }}>
          <label><input type="checkbox" name="food" checked={form.food} onChange={handleChange} /> Food</label>
          <label style={{ marginLeft: 16 }}><input type="checkbox" name="wedding_hall" checked={form.wedding_hall} onChange={handleChange} /> Venue</label>
          <label style={{ marginLeft: 16 }}><input type="checkbox" name="music" checked={form.music} onChange={handleChange} /> Music</label>
          <div style={{ fontSize: "0.95em", color: "#666", marginTop: 4, marginLeft: 2 }}>
            <span style={{ color: '#e53e3e', fontWeight: 'bold' }}>*</span> You can mark more than one if you provide multiple services.
          </div>
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{typeof error === "object" ? JSON.stringify(error) : error}</div>}
        {success && <div style={{ color: "green", marginBottom: 8 }}>{typeof success === "object" ? JSON.stringify(success) : success}</div>}
        <button type="submit" className="purple-button" style={{ width: "100%", padding: 12, fontSize: "1.1em", borderRadius: 8, background: "#5a38ea", color: "#fff", border: "none", marginTop: 12, cursor: "pointer" }}>Save & Continue</button>
      </form>
    </div>
  );
};

export default SupplierKycStartPage;
