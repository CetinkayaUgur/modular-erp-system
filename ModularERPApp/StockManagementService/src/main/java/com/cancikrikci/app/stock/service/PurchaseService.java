package com.cancikrikci.app.stock.service;

import com.cancikrikci.app.stock.entity.Purchase;
import com.cancikrikci.app.stock.entity.PurchaseProduct;
import com.cancikrikci.app.stock.repository.IPurchaseProductRepository;
import com.cancikrikci.app.stock.repository.IPurchaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PurchaseService {
    private final IPurchaseRepository m_purchaseRepository;

    public PurchaseService(IPurchaseRepository purchaseRepository)
    {
        m_purchaseRepository = purchaseRepository;
    }

    public List<Purchase> getAllPurchases()
    {
        return StreamSupport.stream(m_purchaseRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Purchase findPurchaseById(int id)
    {
        return m_purchaseRepository.findById(id).orElseThrow();
    }

    public Purchase addPurchase(Purchase purchase)
    {
        return m_purchaseRepository.save(purchase);
    }

    public void deletePurchaseById(int id)
    {
        m_purchaseRepository.deleteById(id);
    }
} 