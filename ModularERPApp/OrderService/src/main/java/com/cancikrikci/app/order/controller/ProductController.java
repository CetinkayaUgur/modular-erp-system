package com.cancikrikci.app.order.controller;

import com.cancikrikci.app.order.entity.Product;
import com.cancikrikci.app.order.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ord/products")
public class ProductController {
    private final ProductService m_productService;

    public ProductController(ProductService productService) {
        m_productService = productService;
    }

    @GetMapping
    public List<Product> getAll() {
        return m_productService.getAllProducts();
    }

    @GetMapping("product/{id}")
    public Product findById(@PathVariable(name = "id") int id) {
        return m_productService.findProductById(id);
    }

    @GetMapping("product/category/{categoryId}")
    public List<Product> findByCategory(@PathVariable(name = "categoryId") Integer categoryId) {
        return m_productService.findProductsByCategory(categoryId);
    }

    @GetMapping("product/low-stock")
    public List<Product> findLowStock(@RequestParam(name = "threshold") int threshold) {
        return m_productService.findLowStockProducts(threshold);
    }

    @GetMapping("product/active")
    public List<Product> findActive() {
        return m_productService.findActiveProducts();
    }

    @PostMapping("product/save")
    public Product save(@RequestBody Product product) {
        return m_productService.addProduct(product);
    }

    @DeleteMapping("product/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id) {
        m_productService.deleteProductById(id);
    }
} 