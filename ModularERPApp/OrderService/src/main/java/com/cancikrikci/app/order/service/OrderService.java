package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Order;
import com.cancikrikci.app.order.repository.IOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderService {
    private final IOrderRepository m_orderRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public OrderService(IOrderRepository orderRepository, RestTemplate restTemplate)
    {
        m_orderRepository = orderRepository;
        m_restTemplate = restTemplate;
    }

    public List<Order> getAllOrders()
    {
        return StreamSupport.stream(m_orderRepository.findAll().spliterator(), false)
                .filter(o -> o.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public Order findOrderById(int id)
    {
        return m_orderRepository.findById(id).orElseThrow();
    }

    public List<Order> findOrdersByCustomerId(int customerId)
    {
        return m_orderRepository.findByCustomerId(customerId)
                .stream()
                .filter(o -> o.username.equals(getUsername()))
                .toList();
    }

    public List<Order> findOrdersByDateRange(LocalDate startDate, LocalDate endDate)
    {
        return m_orderRepository.findByOrderDateBetween(startDate, endDate)
                .stream()
                .filter(o -> o.username.equals(getUsername()))
                .toList();
    }

    public Order addOrder(Order order)
    {
        order.username = getUsername();
        return m_orderRepository.save(order);
    }

    public void deleteOrderById(int id)
    {
        m_orderRepository.deleteById(id);
    }
} 