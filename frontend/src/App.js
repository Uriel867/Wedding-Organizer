import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Food1Page from "./pages/kyc/Food1Page";
import Food2Page from "./pages/kyc/Food2Page";
import Music1Page from "./pages/kyc/Music1Page";
import Music2Page from "./pages/kyc/Music2Page";
import WeddingHall1Page from "./pages/kyc/WeddingHall1Page";
import WeddingHall2Page from "./pages/kyc/WeddingHall2Page";
import WeddingSuppliersPage from "./pages/WeddingSuppliersPage";
import SupplierLoginPage from "./pages/SupplierLoginPage";
import SupplierRegisterPage from "./pages/SupplierRegisterPage";
import SupplierKycMusicPage from "./pages/kyc/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/kyc/SupplierKycVenuePage";
import SupplierKycStartPage from "./pages/SupplierKycStartPage";
import SupplierKycFoodPage from "./pages/kyc/SupplierKycFoodPage";
import SupplierKycCompletePage from "./pages/kyc/SupplierKycCompletePage";

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

        {/* Supplier Flow */}
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        <Route path="/supplier-register" element={<SupplierRegisterPage />} />
        <Route path="/supplier-kyc-music" element={<SupplierKycMusicPage />} />
        <Route path="/supplier-kyc-venue" element={<SupplierKycVenuePage />} />
        <Route path="/supplier-kyc-food" element={<SupplierKycFoodPage />} />
        <Route path="/supplier-kyc-start" element={<SupplierKycStartPage />} />
        <Route path="/supplier-kyc-complete" element={<SupplierKycCompletePage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
