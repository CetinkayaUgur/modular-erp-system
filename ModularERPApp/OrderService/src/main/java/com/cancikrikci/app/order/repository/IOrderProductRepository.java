package com.cancikrikci.app.order.repository;

import com.cancikrikci.app.order.entity.OrderProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderProductRepository extends CrudRepository<OrderProduct, Integer> {

} 