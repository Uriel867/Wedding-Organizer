import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SupplierKycFoodPage from "./pages/kyc/SupplierKycFoodPage";
import SupplierKycMusicPage from "./pages/kyc/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/kyc/SupplierKycVenuePage";

// Note: This component is now primarily for reference as the routing is handled
// directly by the individual KYC pages using URL query parameters
function SupplierKycRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to start page if accessed directly
    navigate("/supplier-kyc-start");
  }, [navigate]);

  return null;
}

export default SupplierKycRouter;
