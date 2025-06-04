package com.cancikrikci.app.order.repository;

import com.cancikrikci.app.order.entity.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IOrderRepository extends CrudRepository<Order, Integer> {
    List<Order> findByCustomerId(int customerId);
    List<Order> findByOrderDateBetween(LocalDate startDate, LocalDate endDate);
} 