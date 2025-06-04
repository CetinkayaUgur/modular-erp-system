package com.cancikrikci.app.order.repository;

import com.cancikrikci.app.order.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends CrudRepository<Product, Integer> {
    Iterable<Product> findByCategoryId(int categoryId);
    List<Product> findByStockQuantityLessThanEqual(int quantity);
    List<Product> findByIsActive(boolean isActive);
} 