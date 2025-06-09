import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplierKycFoodPage from "./pages/kyc/SupplierKycFoodPage";
import SupplierKycMusicPage from "./pages/kyc/SupplierKycMusicPage";
import SupplierKycVenuePage from "./pages/kyc/SupplierKycVenuePage";

const kycPagesMap = [
  { key: "food", component: SupplierKycFoodPage },
  { key: "music", component: SupplierKycMusicPage },
  { key: "wedding_hall", component: SupplierKycVenuePage },
];

function SupplierKycRouter() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const supplierId = localStorage.getItem("supplierId");
    if (!supplierId) {
      navigate("/supplier-login");
      return;
    }
    fetch(`http://localhost:8000/suppliers/${supplierId}`)
      .then((res) => res.json())
      .then((data) => {
        setSupplier(data);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!supplier) return <div>Supplier not found.</div>;

  // Build the list of KYC pages to show based on expertise
  const relevantPages = kycPagesMap.filter(
    (item) => supplier[item.key] === 0
  );

  if (relevantPages.length === 0) return <div>No KYC questions required.</div>;

  const CurrentKycPage = relevantPages[step]?.component;

  const handleNext = () => {
    if (step < relevantPages.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/supplier-dashboard"); // Or wherever you want to go after KYC
    }
  };

  return (
    <div>
      <CurrentKycPage />
      <div style={{ marginTop: 24, textAlign: "right" }}>
        {step < relevantPages.length - 1 ? (
          <button className="purple-button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="purple-button" onClick={handleNext}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

export default SupplierKycRouter;
