# 🛍️ Product Catalog Microservice (My Contribution)

## 👨‍💻 Contribution Summary

I designed and developed the Product Catalog Microservice, a core backend module in a Real-Time Grocery & Essentials Delivery System.

This service manages all product-related data including product listings, categories, pricing, and availability. It acts as the central source of truth for products, enabling seamless integration with inventory, order, and store services.

Additionally, I enhanced the module with scalable architecture, validation, and optimized APIs for production-ready performance.

## 🎯 My Responsibilities
- Designed and implemented product catalog management system
- Built REST APIs for product operations
- Developed category-based product organization
- Implemented product search and filtering
- Added pagination for large datasets
- Ensured data validation and integrity
- Designed scalable microservice architecture
- Implemented global exception handling
- Created reusable DTOs and response structures
- Integrated with Inventory Service for stock mapping
- Developed APIs for admin product management

## 🚀 Core Features Implemented

### 📦 Product Management
- Add new products
- Update product details
- Delete products
- Fetch all products
- Fetch product by ID

### 🗂️ Category Management
- Organized products into categories
- Fetch products by category
- Enables better UI filtering

### 🔍 Search & Filtering
- Search products by name
- Filter products by category and price
- Supports dynamic queries

### 📄 Pagination & Sorting
- Implemented pagination for product listing
- Supports sorting by price, name, etc.
- Optimized for large-scale product data

### 🔗 Service Integration
- Inventory Service → Fetch stock availability
- Order Service → Product validation
- Store Service → Store-specific product mapping

### ⚠️ Exception Handling & Validation
- Centralized error handling using @ControllerAdvice

**Custom Exceptions:**
- ProductNotFoundException
- InvalidProductException

**Validation:**
- Prevent invalid price or empty fields
- Ensure valid category and product data

### 📊 Standard API Response Format
```json
{
  "status": "success",
  "data": {},
  "message": ""
}
```

## 🏗️ Architecture Design

This module follows a layered microservice architecture:

- **Controller Layer** → Handles HTTP requests
- **Service Layer** → Business logic & validations
- **Repository Layer** → Database operations

## 🗄️ Database Design

### Product Table
| Column      | Description              |
|-------------|--------------------------|
| id          | Primary key              |
| name        | Product name             |
| description | Product description      |
| price       | Product price            |
| category    | Product category         |
| created_at  | Created timestamp        |
| updated_at  | Updated timestamp        |

## 📡 API Endpoints

### 🔹 Product APIs

**Get All Products**  
`GET /api/products`

**Get Product by ID**  
`GET /api/products/{id}`

**Add Product**  
`POST /api/products`

**Update Product**  
`PUT /api/products/{id}`

**Delete Product**  
`DELETE /api/products/{id}`

### 🔹 Search & Filter APIs

**Search Products**  
`GET /api/products/search?name=`

**Filter by Category**  
`GET /api/products/category/{category}`

### 🔹 Pagination API
`GET /api/products?page=0&size=10&sort=price`

## 🛠️ Tech Stack Used
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Lombok
- Maven

## 🔐 Security & Data Protection
- Input validation for all APIs
- Prevention of invalid product entries
- Structured for JWT authentication integration
- Exception-safe API responses

## ⚙️ How to Run
```bash
git clone https://github.com/KAVIN-S-18/product-catalog-module.git
cd product-catalog-module
mvn spring-boot:run
```

## 🎬 Demo Flow
1. Add new product
2. Fetch product list
3. Search/filter products
4. Update product details
5. Delete product
6. Test pagination

## 📈 Performance Highlights
- Optimized database queries
- Pagination support for scalability
- Clean architecture for maintainability
- Fast API response handling

## 🔮 Future Enhancements
- Redis caching for faster reads
- Elasticsearch for advanced search
- Image upload for products
- Role-based access control
- Admin dashboard (React)

## 🏆 Conclusion

This module provides a scalable and efficient product management system for modern e-commerce and grocery platforms.

It ensures:
- Clean data management
- Fast product retrieval
- Seamless integration with other services
- Maintainable and extensible architecture

## 👨‍💻 Author

Kavin S  
Product Catalog Module Developer  
HCL Hackathon Project