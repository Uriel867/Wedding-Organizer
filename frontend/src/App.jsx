import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SupplierLoginPage from "./pages/SupplierLoginPage";
import SupplierKycStartPage from "./pages/SupplierKycStartPage";
import SupplierKycFoodPage from "./pages/kyc/SupplierKycFoodPage";
import SupplierKycMusicPage from "./pages/kyc/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/kyc/SupplierKycVenuePage";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierKycCompletePage from "./pages/kyc/SupplierKycCompletePage";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        <Route path="/supplier-kyc-start" element={<SupplierKycStartPage />} />
        <Route path="/supplier-kyc-food" element={<SupplierKycFoodPage />} />
        <Route path="/supplier-kyc-music" element={<SupplierKycMusicPage />} />
        <Route path="/supplier-kyc-venue" element={<SupplierKycVenuePage />} />
        <Route path="/supplier-kyc-complete" element={<SupplierKycCompletePage />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
      </Routes>
      <button
        className="register-button"
        onClick={() => navigate("/supplier-login")}
      >
        Are you a supplier?
      </button>
    </div>
  );
}

export default App;