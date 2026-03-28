package com.example.grocery.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.grocery.exception.InvalidProductException;
import com.example.grocery.exception.ProductNotFoundException;
import com.example.grocery.model.Product;
import com.example.grocery.repository.ProductRepository;

import jakarta.validation.Valid;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public Page<Product> getAllProducts(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    public Product saveProduct(@Valid Product product) {
        if (product.getPrice() <= 0) {
            throw new InvalidProductException("Product price must be greater than 0");
        }
        if (product.getStock() < 0) {
            throw new InvalidProductException("Product stock cannot be negative");
        }
        return repo.save(product);
    }

    public Product updateProduct(Long id, @Valid Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setBrand(productDetails.getBrand());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setDiscountPrice(productDetails.getDiscountPrice());
        product.setStock(productDetails.getStock());
        product.setCategory(productDetails.getCategory());
        product.setImageUrl(productDetails.getImageUrl());
        product.setRating(productDetails.getRating());
        product.setIsAvailable(productDetails.getIsAvailable());
        return saveProduct(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        repo.delete(product);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getByCategory(String category) {
        return repo.findByCategory(category);
    }

    public Product updateStock(Long id, int qty) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStock(product.getStock() - qty);
        return repo.save(product);
    }
}