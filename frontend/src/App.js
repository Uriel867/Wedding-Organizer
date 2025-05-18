import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KycFlowerPage from "./pages/KycFlowerPage"; // Import Flower KYC Page
import KycDiscoPage from "./pages/KycDiscoPage"; // Import Disco KYC Page
import KycHallPage from "./pages/KycHallPage"; // Import Hall KYC Page
import KycBandPage from "./pages/KycBandPage"; // Import Band KYC Page
import KycDressPage from "./pages/KycDressPage"; // Import Dress KYC Page
import WeddingSuppliersPage from "./pages/WeddingSuppliersPage"; // Import Wedding Suppliers Page
import SupplierLoginPage from "./pages/SupplierLoginPage"; // Import Supplier Login Page
import SupplierRegisterPage from "./pages/SupplierRegisterPage"; // Import Supplier Register Page
import SupplierKycServicePage from "./pages/SupplierKycServicePage";
import SupplierKycMusicPage from "./pages/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/SupplierKycVenuePage";
import SupplierKycDressPage from "./pages/SupplierKycDressPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Flower KYC Page */}
        <Route path="/kyc-flower" element={<KycFlowerPage />} />

        {/* Route for the Disco KYC Page */}
        <Route path="/kyc-disco" element={<KycDiscoPage />} />

        {/* Route for the Hall KYC Page */}
        <Route path="/kyc-hall" element={<KycHallPage />} />

        {/* Route for the Band KYC Page */}
        <Route path="/kyc-band" element={<KycBandPage />} />

        {/* Route for the Dress KYC Page */}
        <Route path="/kyc-dress" element={<KycDressPage />} />

        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for the Wedding Suppliers Page */}
        <Route path="/wedding-suppliers" element={<WeddingSuppliersPage />} />

        {/* Route for the Supplier Login Page */}
        <Route path="/supplier-login" element={<SupplierLoginPage />} />

        {/* Route for the Supplier Register Page */}
        <Route path="/supplier-register" element={<SupplierRegisterPage />} />

        {/* Supplier KYC Pages */}
        <Route path="/supplier-kyc-service" element={<SupplierKycServicePage />} />
        <Route path="/supplier-kyc-music" element={<SupplierKycMusicPage />} />
        <Route path="/supplier-kyc-venue" element={<SupplierKycVenuePage />} />
        <Route path="/supplier-kyc-dress" element={<SupplierKycDressPage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
