import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
