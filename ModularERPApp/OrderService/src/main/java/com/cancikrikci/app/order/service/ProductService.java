package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Product;
import com.cancikrikci.app.order.repository.IProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService {
    private final IProductRepository m_productRepository;

    public ProductService(IProductRepository productRepository)
    {
        m_productRepository = productRepository;
    }

    public List<Product> getAllProducts()
    {
        return StreamSupport.stream(m_productRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Product findProductById(int id)
    {
        return m_productRepository.findById(id).orElseThrow();
    }

    public List<Product> findProductsByCategory(Integer categoryId)
    {
        return StreamSupport.stream(m_productRepository.findByCategoryId(categoryId).spliterator(), false)
                .collect(Collectors.toList());
    }

    public List<Product> findLowStockProducts(int threshold)
    {
        return m_productRepository.findByStockQuantityLessThanEqual(threshold);
    }

    public List<Product> findActiveProducts()
    {
        return m_productRepository.findByIsActive(true);
    }

    public Product addProduct(Product product)
    {
        return m_productRepository.save(product);
    }

    public void deleteProductById(int id)
    {
        m_productRepository.deleteById(id);
    }
} 