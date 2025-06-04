package com.cancikrikci.app.stock.repository;

import com.cancikrikci.app.stock.entity.Purchase;
import com.cancikrikci.app.stock.entity.Supplier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISupplierRepository extends CrudRepository<Supplier, Integer> {

} 