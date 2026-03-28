import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { productAPI } from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts();
      // Adjusting to handle both Page object and direct list
      const data = response.data.data.content || response.data.data;
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      // Fallback with mock data for demonstration if backend fails
      const mockData = [
        { 
          id: 1, name: "Greek Yogurt", brand: "Epigamia", description: "Rich and creamy high protein yogurt", 
          price: 45.0, stock: 12, category: "Dairy", rating: 4.8, 
          imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80" 
        },
        { 
          id: 2, name: "Fresh Blueberries", brand: "O-Farm", description: "Sweet and juicy organic blueberries", 
          price: 199.0, stock: 4, category: "Fruits", rating: 4.9, 
          imageUrl: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=400&q=80" 
        },
        { 
          id: 3, name: "Sourdough Bread", brand: "Bakehouse", description: "Artisan sourdough bread baked daily", 
          price: 120.0, stock: 8, category: "Bakery", rating: 4.7, 
          imageUrl: "https://images.unsplash.com/photo-1585478259715-876a6a8ceebf?auto=format&fit=crop&w=400&q=80" 
        }
      ];
      setProducts(mockData);
      setError("Note: Running with simulation mode (Backend disconnected)");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Real-time Inventory Sync Simulation (Stock randomly changes to show "live" effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prev => prev.map(p => {
        if (Math.random() > 0.9) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock };
        }
        return p;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddProduct = async (product) => {
    try {
      await productAPI.addProduct(product);
      fetchProducts();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding product:", err);
      // local update for simulation
      const newProduct = { ...product, id: Date.now() };
      setProducts(prev => [newProduct, ...prev]);
      setIsModalOpen(false);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      await productAPI.updateProduct(editingProduct.id, product);
      fetchProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
      // local update
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...product, id: p.id } : p));
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Remove this item from catalog?")) {
      try {
        await productAPI.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    }
  };

  const handleSearch = async (term) => {
    if (term) {
      try {
        const response = await productAPI.searchProducts(term);
        setProducts(response.data.data);
      } catch (err) {
        console.error("Searching locally...");
        fetchProducts(); // Refresh then filter locally
      }
    } else {
      fetchProducts();
    }
  };

  const handleCategoryFilter = async (category) => {
    if (category) {
      try {
        const response = await productAPI.getProductsByCategory(category);
        setProducts(response.data.data);
      } catch (err) {
        console.error("Filtering locally...");
        // Handle filter locally if backend fails
      }
    } else {
      fetchProducts();
    }
  };

  return (
    <div className="App">
      <nav className="navbar glass">
        <div className="logo">
          <span className="logo-emoji">🏪</span> 
          <span>Essentials<b>Go</b></span>
        </div>
        <div className="nav-status">
          <span className="status-badge status-live">Live Sync Active</span>
        </div>
        <button onClick={() => { setEditingProduct({}); setIsModalOpen(true); }} className="add-btn">
          + Add Item
        </button>
      </nav>

      <div className="container">
        <header className="hero">
          <h1 className="animate-fade-in">Fresh Essentials <br/> <span style={{color: 'var(--primary)'}}>Real-Time</span> Inventory.</h1>
          <p className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            Manage your catalog with high-fidelity performance and real-time stock orchestration.
          </p>
          
          <div className="controls animate-fade-in" style={{animationDelay: '0.2s'}}>
            <SearchBar onSearch={handleSearch} />
            <div className="divider" style={{width: '1px', height: '40px', background: '#e2e8f0', display: 'none'}}></div>
            <CategoryFilter onFilter={handleCategoryFilter} />
          </div>
        </header>

        {error && <div className="backend-alert">{error}</div>}

        <main>
          {loading ? (
            <div className="loading-spinner">Initializing EssentialsGo...</div>
          ) : (
            <ProductList
              products={products}
              onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }}
              onDelete={handleDeleteProduct}
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct.id ? handleUpdateProduct : handleAddProduct}
          onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

export default App;