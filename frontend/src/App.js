import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KycFlowerPage from "./pages/KycFlowerPage"; // Import Flower KYC Page
import KycDiscoPage from "./pages/KycDiscoPage"; // Import Disco KYC Page
import WeddingSuppliersPage from "./pages/WeddingSuppliersPage"; // Import Wedding Suppliers Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Flower KYC Page */}
        <Route path="/kyc-flower" element={<KycFlowerPage />} />

        {/* Route for the Disco KYC Page */}
        <Route path="/kyc-disco" element={<KycDiscoPage />} />

        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for the Wedding Suppliers Page */}
        <Route path="/wedding-suppliers" element={<WeddingSuppliersPage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
