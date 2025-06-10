import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Food1Page from "./pages/kyc/user/Food1Page";
import Food2Page from "./pages/kyc/user/Food2Page";
import Music1Page from "./pages/kyc/user/Music1Page";
import Music2Page from "./pages/kyc/user/Music2Page";
import WeddingHall1Page from "./pages/kyc/user/WeddingHall1Page";
import WeddingHall2Page from "./pages/kyc/user/WeddingHall2Page";
import WeddingSuppliersPage from "./pages/WeddingSuppliersPage";
import SupplierLoginPage from "./pages/SupplierLoginPage";
import SupplierRegisterPage from "./pages/SupplierRegisterPage";
import SupplierKycStartPage from "./pages/SupplierKycStartPage";
// Supplier KYC new pages
import SupplierFood1Page from "./pages/kyc/supplier/SupplierFood1Page";
import SupplierFood2Page from "./pages/kyc/supplier/SupplierFood2Page";
import SupplierMusic1Page from "./pages/kyc/supplier/SupplierMusic1Page";
import SupplierMusic2Page from "./pages/kyc/supplier/SupplierMusic2Page";
import SupplierVenue1Page from "./pages/kyc/supplier/SupplierVenue1Page";
import SupplierVenue2Page from "./pages/kyc/supplier/SupplierVenue2Page";
import SupplierKycCompletePage from "./pages/kyc/supplier/SupplierKycCompletePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* KYC Flow */}
        <Route path="/kyc-song" element={<Food1Page />} />
        <Route path="/kyc-song-2" element={<Food2Page />} />
        <Route path="/kyc-hall" element={<WeddingHall1Page />} />
        <Route path="/kyc-hall-2" element={<WeddingHall2Page />} />
        <Route path="/kyc-steak" element={<Music1Page />} />
        <Route path="/kyc-steak-2" element={<Music2Page />} />
        <Route path="/wedding-suppliers" element={<WeddingSuppliersPage />} />

        {/* Supplier Flow - new pages */}
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        <Route path="/supplier-register" element={<SupplierRegisterPage />} />
        <Route path="/supplier-kyc-food-1" element={<SupplierFood1Page />} />
        <Route path="/supplier-kyc-food-2" element={<SupplierFood2Page />} />
        <Route path="/supplier-kyc-music-1" element={<SupplierMusic1Page />} />
        <Route path="/supplier-kyc-music-2" element={<SupplierMusic2Page />} />
        <Route path="/supplier-kyc-venue-1" element={<SupplierVenue1Page />} />
        <Route path="/supplier-kyc-venue-2" element={<SupplierVenue2Page />} />
        <Route path="/supplier-kyc-complete" element={<SupplierKycCompletePage />} />
        <Route path="/supplier-kyc-start" element={<SupplierKycStartPage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
