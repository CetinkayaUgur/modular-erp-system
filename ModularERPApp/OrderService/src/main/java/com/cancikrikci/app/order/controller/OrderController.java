package com.cancikrikci.app.order.controller;

import com.cancikrikci.app.order.entity.Order;
import com.cancikrikci.app.order.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {
    private final OrderService m_orderService;

    public OrderController(OrderService orderService)
    {
        m_orderService = orderService;
    }

    @GetMapping
    public List<Order> getAll()
    {
        return m_orderService.getAllOrders();
    }

    @GetMapping("order/{id}")
    public Order findById(@PathVariable(name = "id") int id)
    {
        return m_orderService.findOrderById(id);
    }

    @GetMapping("order/customer/{customerId}")
    public List<Order> findByCustomerId(@PathVariable(name = "customerId") int customerId)
    {
        return m_orderService.findOrdersByCustomerId(customerId);
    }

    @GetMapping("order/date-range")
    public List<Order> findByDateRange(@RequestParam(name = "startDate") LocalDate startDate,
                                       @RequestParam(name = "endDate") LocalDate endDate)
    {
        return m_orderService.findOrdersByDateRange(startDate, endDate);
    }

    @PostMapping("order/save")
    public Order save(@RequestBody Order order)
    {
        return m_orderService.addOrder(order);
    }

    @DeleteMapping("order/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_orderService.deleteOrderById(id);
    }
} 