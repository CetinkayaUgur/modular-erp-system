package com.cancikrikci.app.order.repository;

import com.cancikrikci.app.order.entity.Product;
import com.cancikrikci.app.order.entity.ProductCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductCategoryRepository extends CrudRepository<ProductCategory, Integer> {

} 