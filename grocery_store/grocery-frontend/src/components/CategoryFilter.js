import React, { useState } from "react";
import "./CategoryFilter.css";

const categories = [
  { id: "all", name: "All Items", icon: "📦" },
  { id: "Dairy", name: "Dairy", icon: "🥛" },
  { id: "Fruits", name: "Fruits", icon: "🍎" },
  { id: "Vegetables", name: "Vegetables", icon: "🥦" },
  { id: "Bakery", name: "Bakery", icon: "🥐" },
  { id: "Beverages", name: "Beverages", icon: "🥤" },
];

function CategoryFilter({ onFilter }) {
  const [active, setActive] = useState("all");

  const handleFilter = (catId) => {
    setActive(catId);
    onFilter(catId === "all" ? "" : catId);
  };

  return (
    <div className="category-container">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-chip ${active === cat.id ? "active" : ""}`}
          onClick={() => handleFilter(cat.id)}
        >
          <span className="chip-icon">{cat.icon}</span>
          <span className="chip-label">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;