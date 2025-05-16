import React, { useEffect, useState } from "react";
import "./WeddingSuppliersPage.css";

function SupplierCard({ supplier, liked, onToggleLike }) {
  return (
    <div className="supplier-card">
      <div className="supplier-info">
        <strong>{supplier.name}</strong>
        <p>
          Rating: {supplier.rating} ({supplier.user_ratings_total} reviews)
        </p>
        <p>
          Address: {supplier.address} <br />
          Phone: {supplier.phone_number}
        </p>
        {supplier.price_range && <p>Price Range: {supplier.price_range}</p>}
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
  const [loading, setLoading] = useState(true);
  const [likedSuppliers, setLikedSuppliers] = useState({}); // Track liked suppliers
  const [showSelected, setShowSelected] = useState(false); // Toggle to show only liked suppliers

  useEffect(() => {
    // Fetch suppliers from the backend
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:8000/suppliers");
        const data = await response.json();
        setGroupedSuppliers(data.grouped_suppliers);

        // Initialize likedSuppliers state with all suppliers set to false
        const initialLikedState = {};
        Object.values(data.grouped_suppliers)
          .flat()
          .forEach((supplier) => {
            initialLikedState[supplier.id] = false;
          });
        setLikedSuppliers(initialLikedState);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Toggle the "liked" state of a supplier
  const onToggleLike = (supplierId) => {
    setLikedSuppliers((prevLikedSuppliers) => ({
      ...prevLikedSuppliers,
      [supplierId]: !prevLikedSuppliers[supplierId], // Toggle the liked state
    }));
  };

  // Filter suppliers based on the `showSelected` state
  const getFilteredSuppliers = () => {
    if (!showSelected) {
      return groupedSuppliers;
    }

    const filteredSuppliers = {};
    Object.entries(groupedSuppliers).forEach(([section, suppliers]) => {
      filteredSuppliers[section] = suppliers.filter(
        (supplier) => likedSuppliers[supplier.id]
      );
    });

    return filteredSuppliers;
  };

  if (loading) {
    return <p className="loading-message">Loading suppliers...</p>;
  }

  const filteredSuppliers = getFilteredSuppliers();

  return (
    <div className="suppliers-container">
      <h1 className="page-title">Supplier Comparison Results</h1>
      <p className="page-description">
        Based on your preferences, we've matched you with these suppliers:
      </p>

      <button
        className="purple-button"
        onClick={() => setShowSelected((prev) => !prev)}
      >
        {showSelected ? "Show All" : "Show Selected"}
      </button>

      {Object.entries(filteredSuppliers).map(([section, suppliers]) => (
        <div key={section} className="section">
          <h2 className="section-title">{section}</h2>
          <div className="supplier-list">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  liked={likedSuppliers[supplier.id]} // Pass liked status
                  onToggleLike={onToggleLike} // Pass toggle function
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