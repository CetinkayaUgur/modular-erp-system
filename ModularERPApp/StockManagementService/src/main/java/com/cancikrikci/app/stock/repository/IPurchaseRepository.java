package com.cancikrikci.app.stock.repository;

import com.cancikrikci.app.stock.entity.Product;
import com.cancikrikci.app.stock.entity.Purchase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPurchaseRepository extends CrudRepository<Purchase, Integer> {

} 