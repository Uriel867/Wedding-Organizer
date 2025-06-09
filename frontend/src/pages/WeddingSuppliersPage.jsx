import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeddingSuppliersPage.css";

function SupplierCard({ supplier, liked, onToggleLike, matchScore, section }) {
  // Try all possible name fields
  const displayName = supplier.name || supplier.business_name || supplier.buisness_name || "Unnamed Supplier";
  
  // Get the actual score field based on section
  const scoreField = section === "מקומות" ? "wedding_hall" : section;
  const score = supplier[scoreField];
  
  return (
    <div className="supplier-card">
      <div className="supplier-info">
        <strong>{displayName}</strong>
        {matchScore !== undefined && (
          <div className="match-info" style={{ fontSize: "0.9em", marginTop: 4 }}>
            <div style={{ color: matchScore === 0 ? "#388e3c" : "#666" }}>
              {matchScore === 0
                ? "Perfect Match! 🎯"
                : `Match Difference: ${matchScore}`}
            </div>
            <div style={{ color: "#666", fontSize: "0.8em" }}>
              {score !== null && score !== undefined ? `Score: ${score}` : "No score available"}
            </div>
          </div>
        )}
        <p>Rating: {supplier.rating} ({supplier.user_ratings_total} reviews)</p>
        <p>
          Address: {supplier.address} <br />
          Phone: {supplier.phone_number}
        </p>
      </div>
      <div className="supplier-actions">
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          onClick={() => onToggleLike(supplier.id)}
          title="Like"
        >
          {liked ? "❤️" : "🤍"}
        </button>
        {supplier.website && (
          <a
            href={supplier.website}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Website"
            className="website-icon"
          >
            🌐
          </a>
        )}
      </div>
    </div>
  );
}

function WeddingSuppliersPage() {
  const [groupedSuppliers, setGroupedSuppliers] = useState({});
  const [userScores, setUserScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [likedSuppliers, setLikedSuppliers] = useState({});
  const [showSelected, setShowSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user scores first
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userRes = await fetch(`http://localhost:8000/users/users/${userId}`);
          const userData = await userRes.json();
          console.log("User data:", userData);
          setUserScores({
            food: userData.food,
            music: userData.music,
            wedding_hall: userData.wedding_hall,
          });
        }

        // Then fetch suppliers
        const suppliersRes = await fetch("http://localhost:8000/suppliers");
        const data = await suppliersRes.json();

        // Initialize liked state
        const initialLikedState = {};
        Object.values(data.grouped_suppliers)
          .flat()
          .forEach((supplier) => {
            initialLikedState[supplier.id] = false;
          });
        setLikedSuppliers(initialLikedState);
        setGroupedSuppliers(data.grouped_suppliers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle the "liked" state of a supplier
  const onToggleLike = (supplierId) => {
    setLikedSuppliers((prevLikedSuppliers) => ({
      ...prevLikedSuppliers,
      [supplierId]: !prevLikedSuppliers[supplierId], // Toggle the liked state
    }));
  };

  // Helper to sort suppliers by score difference
  const sortSuppliersByMatch = (suppliers, section) => {
    // Get the correct score field based on section
    const scoreField = section === "מקומות" ? "wedding_hall" : section;
    const userScore = userScores[scoreField];

    // First filter suppliers into two groups: with scores and without scores
    const suppliersWithScores = suppliers.filter(s => 
      s[scoreField] !== null && s[scoreField] !== undefined
    );
    const suppliersWithoutScores = suppliers.filter(s => 
      s[scoreField] === null || s[scoreField] === undefined
    );
    const supplierDifs = suppliersWithScores.map(supplier =>
      Math.abs(supplier[scoreField] - userScore)
    );
    console.log(userScore)

    // Sort suppliers with scores by their distance from user score
    const sortedWithScores = suppliersWithScores.sort((a, b) => {
      const aDiff = Math.abs(a[scoreField] - userScore);
      const bDiff = Math.abs(b[scoreField] - userScore);
      return aDiff - bDiff; // Smallest difference first
    });

    // Combine the sorted suppliers with scores with the unsorted ones without scores
    return [...sortedWithScores, ...suppliersWithoutScores];
  };

  // Get filtered and sorted suppliers
  const getFilteredAndSortedSuppliers = () => {
    const filtered = showSelected
      ? Object.fromEntries(
          Object.entries(groupedSuppliers).map(([section, suppliers]) => [
            section,
            suppliers.filter((supplier) => likedSuppliers[supplier.id]),
          ])
        )
      : groupedSuppliers;

    return Object.fromEntries(
      Object.entries(filtered).map(([section, suppliers]) => [
        section,
        sortSuppliersByMatch(suppliers, section),
      ])
    );
  };


  const getMatchScore = (supplier, section) => {
    const scoreField = section === "מקומות" ? "wedding_hall" : section;
    const supplierScore = supplier[scoreField];
    const userScore = userScores[scoreField];

    // Only calculate score if both supplier and user have scores
    if (supplierScore !== null && supplierScore !== undefined && 
        userScore !== null && userScore !== undefined) {
      return Math.abs(supplierScore - userScore);
    }
    
    return undefined;
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Redo KYC handler
  const handleRedoKyc = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      await fetch(`http://localhost:8000/users/${userId}/reset-kyc`, {
        method: "POST",
      });
      navigate("/kyc-song"); // Or the first KYC page in your flow
    } catch (err) {
      alert("Failed to reset KYC. Please try again.");
    }
  };

  if (loading) {
    return <p className="loading-message">Loading suppliers...</p>;
  }

  const filteredAndSortedSuppliers = getFilteredAndSortedSuppliers();

  return (
    <div
      className="kyc-container"
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 10px #eee",
        position: "relative",
      }}
    >
      {/* Top left and right buttons */}
      <button
        className="purple-button"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          minWidth: 100,
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="purple-button"
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          minWidth: 100,
        }}
        onClick={handleRedoKyc}
      >
        Redo KYC
      </button>

      <h1 className="kyc-title" style={{ marginTop: 60 }}>
        Supplier Comparison Results
      </h1>
      <p className="kyc-description">
        Based on your preferences, we've matched you with these suppliers:
      </p>

      <button
        className="purple-button"
        style={{ margin: "16px 0" }}
        onClick={() => setShowSelected((prev) => !prev)}
      >
        {showSelected ? "Show All" : "Show Selected"}
      </button>

      {Object.entries(filteredAndSortedSuppliers).map(([section, suppliers]) => (
        <div key={section} className="section">
          <h2 className="section-title">
            {section}
            {userScores[section] !== undefined && (
              <span
                style={{
                  fontSize: "0.8em",
                  color: "#666",
                  marginLeft: 8,
                }}
              >
                (Your score: {userScores[section]})
              </span>
            )}
          </h2>
          <div className="supplier-list">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  liked={likedSuppliers[supplier.id]}
                  onToggleLike={onToggleLike}
                  matchScore={getMatchScore(supplier, section)}
                  section={section}
                />
              ))
            ) : (
              <p className="no-suppliers-message">
                No suppliers available in this category.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeddingSuppliersPage;