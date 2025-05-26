package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Order;
import com.cancikrikci.app.order.entity.ProductCategory;
import com.cancikrikci.app.order.repository.IOrderRepository;
import com.cancikrikci.app.order.repository.IProductCategoryRepository;
import com.cancikrikci.app.order.repository.IProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductCategoryService {
    private final IProductCategoryRepository m_productCategoryRepository;

    public ProductCategoryService(IProductCategoryRepository productRepository)
    {
        m_productCategoryRepository = productRepository;
    }

    public List<ProductCategory> getAllCategories()
    {
        return StreamSupport.stream(m_productCategoryRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public ProductCategory findCategoryById(int id)
    {
        return m_productCategoryRepository.findById(id).orElseThrow();
    }


    public ProductCategory addCategory(ProductCategory category)
    {
        return m_productCategoryRepository.save(category);
    }

    public void deleteCategoryById(int id)
    {
        m_productCategoryRepository.deleteById(id);
    }
} 