import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const productAPI = {
  getAllProducts: (page = 0, size = 10, sort = 'name') => API.get(`/products?page=${page}&size=${size}&sort=${sort}`),
  getProductById: (id) => API.get(`/products/${id}`),
  addProduct: (product) => API.post('/products', product),
  updateProduct: (id, product) => API.put(`/products/${id}`, product),
  deleteProduct: (id) => API.delete(`/products/${id}`),
  searchProducts: (name) => API.get(`/products/search?name=${name}`),
  getProductsByCategory: (category) => API.get(`/products/category/${category}`),
  updateStock: (id, qty) => API.put(`/products/${id}/stock?qty=${qty}`)
};

export default API;