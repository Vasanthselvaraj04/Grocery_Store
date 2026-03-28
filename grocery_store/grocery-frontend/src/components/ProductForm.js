import React, { useState, useEffect } from "react";
import "./ProductForm.css";

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    discountPrice: "0",
    stock: "0",
    category: "Dairy",
    imageUrl: "",
    rating: "4.5",
    isAvailable: true,
  });

  useEffect(() => {
    if (product?.id) {
      setFormData({
        ...product,
        discountPrice: product.discountPrice ? product.discountPrice.toString() : "0",
        price: product.price ? product.price.toString() : "",
        stock: product.stock ? product.stock.toString() : "0",
        rating: product.rating ? product.rating.toString() : "4.5",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product?.id ? "Edit Product" : "Add New Essential"}</h2>
          <button className="close-x" onClick={onCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Greek Yogurt" required />
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Milk Basket" required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter product details..." required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Dairy">Dairy</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Bakery">Bakery</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-btn">{product?.id ? "Update Product" : "Save Item"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;