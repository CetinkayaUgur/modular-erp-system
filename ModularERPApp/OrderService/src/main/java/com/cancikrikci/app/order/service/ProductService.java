package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Product;
import com.cancikrikci.app.order.repository.IProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService {
    private final IProductRepository m_productRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }


    public ProductService(IProductRepository productRepository, RestTemplate restTemplate)
    {
        m_productRepository = productRepository;
        m_restTemplate = restTemplate;
    }

    public List<Product> getAllProducts()
    {
        return StreamSupport.stream(m_productRepository.findAll().spliterator(), false)
                .filter(p -> p.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public Product findProductById(int id)
    {
        return m_productRepository.findById(id).orElseThrow();
    }

    public List<Product> findProductsByCategory(Integer categoryId)
    {
        return StreamSupport.stream(m_productRepository.findByCategoryId(categoryId).spliterator(), false)
                .filter(p -> p.username.equals(getUsername()))
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
        product.username = getUsername();
        return m_productRepository.save(product);
    }

    public void deleteProductById(int id)
    {
        m_productRepository.deleteById(id);
    }
} 