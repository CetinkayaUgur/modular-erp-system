package com.cancikrikci.app.order.controller;

import com.cancikrikci.app.order.entity.OrderProduct;
import com.cancikrikci.app.order.entity.ProductCategory;
import com.cancikrikci.app.order.service.OrderProductService;
import com.cancikrikci.app.order.service.ProductCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ord/orderproducts")
public class OrderProductController {
    private final OrderProductService m_orderProductService;

    public OrderProductController(OrderProductService orderProductService)
    {
        m_orderProductService = orderProductService;
    }

    @GetMapping
    public List<OrderProduct> getAll()
    {
        return m_orderProductService.getAllOrderProducts();
    }

    @GetMapping("orderproduct/{id}")
    public OrderProduct findById(@PathVariable(name = "id") int id)
    {
        return m_orderProductService.findOrderProductById(id);
    }

    @PostMapping("orderproduct/save")
    public OrderProduct save(@RequestBody OrderProduct category)
    {
        return m_orderProductService.addOrderProduct(category);
    }

    @DeleteMapping("orderproduct/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_orderProductService.deleteOrderProductById(id);
    }
} 