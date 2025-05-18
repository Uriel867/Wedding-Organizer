import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KycSongPage1 from "./pages/KycSongPage1";
import KycSongPage2 from "./pages/KycSongPage2";
import KycHallPage1 from "./pages/KycHallPage1";
import KycHallPage2 from "./pages/KycHallPage2";
import KycSteakPage1 from "./pages/KycSteakPage1";
import KycSteakPage2 from "./pages/KycSteakPage2";
import WeddingSuppliersPage from "./pages/WeddingSuppliersPage";
import SupplierLoginPage from "./pages/SupplierLoginPage";
import SupplierRegisterPage from "./pages/SupplierRegisterPage";
import SupplierKycServicePage from "./pages/SupplierKycServicePage";
import SupplierKycMusicPage from "./pages/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/SupplierKycVenuePage";
import SupplierKycDressPage from "./pages/SupplierKycDressPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* KYC Flow */}
        <Route path="/kyc-song" element={<KycSongPage1 />} />
        <Route path="/kyc-song-2" element={<KycSongPage2 />} />
        <Route path="/kyc-hall" element={<KycHallPage1 />} />
        <Route path="/kyc-hall-2" element={<KycHallPage2 />} />
        <Route path="/kyc-steak" element={<KycSteakPage1 />} />
        <Route path="/kyc-steak-2" element={<KycSteakPage2 />} />
        <Route path="/wedding-suppliers" element={<WeddingSuppliersPage />} />

        {/* Supplier Flow */}
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        <Route path="/supplier-register" element={<SupplierRegisterPage />} />
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
