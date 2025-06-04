package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Order;
import com.cancikrikci.app.order.repository.IOrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderService {
    private final IOrderRepository m_orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        m_orderRepository = orderRepository;
    }

    public List<Order> getAllOrders()
    {
        return StreamSupport.stream(m_orderRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Order findOrderById(int id)
    {
        return m_orderRepository.findById(id).orElseThrow();
    }

    public List<Order> findOrdersByCustomerId(int customerId)
    {
        return m_orderRepository.findByCustomerId(customerId);
    }

    public List<Order> findOrdersByDateRange(LocalDate startDate, LocalDate endDate)
    {
        return m_orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    public Order addOrder(Order order)
    {
        return m_orderRepository.save(order);
    }

    public void deleteOrderById(int id)
    {
        m_orderRepository.deleteById(id);
    }
} 