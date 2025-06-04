package com.cancikrikci.app.stock.repository;

import com.cancikrikci.app.stock.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends CrudRepository<Product, Integer> {
    List<Product> findAll();
    Iterable<Product> findByCategoryId(Integer categoryId);
    List<Product> findByStockQuantityLessThanEqual(int quantity);
    List<Product> findByIsActive(boolean isActive);
} 