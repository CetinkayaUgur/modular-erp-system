package com.cancikrikci.app.order.controller;

import com.cancikrikci.app.order.entity.Order;
import com.cancikrikci.app.order.entity.Product;
import com.cancikrikci.app.order.entity.ProductCategory;
import com.cancikrikci.app.order.service.OrderService;
import com.cancikrikci.app.order.service.ProductCategoryService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/ord/categories")
public class ProductCategoryController {
    private final ProductCategoryService m_productCategoryService;

    public ProductCategoryController(ProductCategoryService categoryService)
    {
        m_productCategoryService = categoryService;
    }

    @GetMapping
    public List<ProductCategory> getAll()
    {
        return m_productCategoryService.getAllCategories();
    }

    @GetMapping("category/{id}")
    public ProductCategory findById(@PathVariable(name = "id") int id)
    {
        return m_productCategoryService.findCategoryById(id);
    }

    @PostMapping("category/save")
    public ProductCategory save(@RequestBody ProductCategory category)
    {
        return m_productCategoryService.addCategory(category);
    }

    @DeleteMapping("category/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_productCategoryService.deleteCategoryById(id);
    }
} 