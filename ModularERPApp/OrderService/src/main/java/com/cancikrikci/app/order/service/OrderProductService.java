package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.OrderProduct;
import com.cancikrikci.app.order.entity.ProductCategory;
import com.cancikrikci.app.order.repository.IOrderProductRepository;
import com.cancikrikci.app.order.repository.IProductCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderProductService {
    private final IOrderProductRepository m_orderProductRepository;

    public OrderProductService(IOrderProductRepository orderProductRepository)
    {
        m_orderProductRepository = orderProductRepository;
    }

    public List<OrderProduct> getAllOrderProducts()
    {
        return StreamSupport.stream(m_orderProductRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public OrderProduct findOrderProductById(int id)
    {
        return m_orderProductRepository.findById(id).orElseThrow();
    }


    public OrderProduct addOrderProduct(OrderProduct orderProduct)
    {
        return m_orderProductRepository.save(orderProduct);
    }

    public void deleteOrderProductById(int id)
    {
        m_orderProductRepository.deleteById(id);
    }
} 