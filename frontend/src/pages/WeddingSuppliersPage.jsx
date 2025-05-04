import React, { useEffect, useState } from "react";
import "./WeddingSuppliersPage.css";

function WeddingSuppliersPage() {
  const [groupedSuppliers, setGroupedSuppliers] = useState({});
  const [loading, setLoading] = useState(true);
  const [likedSuppliers, setLikedSuppliers] = useState({}); // Track liked suppliers

  useEffect(() => {
    // Fetch suppliers from the backend
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:8000/suppliers");
        const data = await response.json();
        setGroupedSuppliers(data.grouped_suppliers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Toggle the "liked" state of a supplier
  const toggleLike = (supplierId) => {
    setLikedSuppliers((prevLikedSuppliers) => ({
      ...prevLikedSuppliers,
      [supplierId]: !prevLikedSuppliers[supplierId],
    }));
  };

  if (loading) {
    return <p className="loading-message">Loading suppliers...</p>;
  }

  return (
    <div className="suppliers-container">
      <h1 className="page-title">Supplier Comparison Results</h1>
      <p className="page-description">
        Based on your preferences, we've matched you with these suppliers:
      </p>

      {Object.entries(groupedSuppliers).map(([section, suppliers]) => (
        <div key={section} className="section">
          <h2 className="section-title">{section}</h2>
          <div className="supplier-list">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <div key={supplier.id} className="supplier-card">
                  <div className="supplier-info">
                    <strong>{supplier.name}</strong>
                    <p>Rating: {supplier.rating} ({supplier.user_ratings_total} reviews)</p>
                    <p>
                      Address: {supplier.address} <br />
                      Phone: {supplier.phone_number}
                    </p>
                    <p>Price Range: {supplier.price_range}</p>
                  </div>
                  <div className="supplier-actions">
                    <button
                      className={`heart-button ${
                        likedSuppliers[supplier.id] ? "liked" : ""
                      }`}
                      onClick={() => toggleLike(supplier.id)}
                      title="Like"
                    >
                      ❤️
                    </button>
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Website"
                      className="website-icon"
                    >
                      🌐
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-suppliers-message">No suppliers available in this category.</p>
            )}
          </div>
        </div>
      ))}

      <div className="action-buttons">
        <button className="purple-button">Compare Selected</button>
        <button className="purple-button">Share Results</button>
      </div>
    </div>
  );
}

export default WeddingSuppliersPage;