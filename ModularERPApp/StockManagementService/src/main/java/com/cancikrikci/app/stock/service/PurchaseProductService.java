package com.cancikrikci.app.stock.service;

import com.cancikrikci.app.stock.entity.PurchaseProduct;
import com.cancikrikci.app.stock.repository.IPurchaseProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PurchaseProductService {
    private final IPurchaseProductRepository m_purchaseProductRepository;

    public PurchaseProductService(IPurchaseProductRepository purchaseProductRepository)
    {
        m_purchaseProductRepository = purchaseProductRepository;
    }

    public List<PurchaseProduct> getAllPurchaseProducts()
    {
        return StreamSupport.stream(m_purchaseProductRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public PurchaseProduct findPurchaseProductById(int id)
    {
        return m_purchaseProductRepository.findById(id).orElseThrow();
    }

    public PurchaseProduct addPurchaseProduct(PurchaseProduct product)
    {
        return m_purchaseProductRepository.save(product);
    }

    public void deletePurchaseProductById(int id)
    {
        m_purchaseProductRepository.deleteById(id);
    }
} 