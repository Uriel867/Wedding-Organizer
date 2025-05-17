import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SupplierLoginPage from "./pages/SupplierLoginPage";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        {/* Other routes */}
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