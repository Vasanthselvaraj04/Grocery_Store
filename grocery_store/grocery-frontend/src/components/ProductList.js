import React from "react";
import "./ProductList.css";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-catalog">
        <div className="empty-icon">📦</div>
        <h3>No items found</h3>
        <p>Try searching for something else or add a new essential.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card animate-fade-in">
          <div className="card-image-wrapper">
            <img 
              src={product.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"} 
              alt={product.name} 
              className="card-image"
            />
            <div className={`stock-badge ${product.stock <= 5 ? "low-stock" : ""}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </div>
            <div className="category-tag">{product.category}</div>
          </div>
          
          <div className="card-content">
            <div className="product-brand">{product.brand || "Freshly"}</div>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            
            <div className="product-footer">
              <div className="price-container">
                <span className="current-price">₹{product.price}</span>
                {product.discountPrice && (
                  <span className="old-price">₹{product.price + (product.discountPrice || 0)}</span>
                )}
              </div>
              
              <div className="card-actions">
                <button 
                  onClick={() => onEdit(product)} 
                  className="action-btn edit-btn"
                  aria-label="Edit product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button 
                  onClick={() => onDelete(product.id)} 
                  className="action-btn delete-btn"
                  aria-label="Delete product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;