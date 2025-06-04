package com.cancikrikci.app.stock.controller;

import com.cancikrikci.app.stock.entity.Purchase;
import com.cancikrikci.app.stock.entity.PurchaseProduct;
import com.cancikrikci.app.stock.service.PurchaseProductService;
import com.cancikrikci.app.stock.service.PurchaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/purchases")
public class PurchaseController {
    private final PurchaseService m_purchaseService;

    public PurchaseController(PurchaseService purchaseService)
    {
        m_purchaseService = purchaseService;
    }

    @GetMapping
    public List<Purchase> getAll()
    {
        return m_purchaseService.getAllPurchases();
    }

    @GetMapping("purchase/{id}")
    public Purchase findById(@PathVariable(name = "id") int id)
    {
        return m_purchaseService.findPurchaseById(id);
    }

    @PostMapping("purchase/save")
    public Purchase save(@RequestBody Purchase purchase)
    {
        return m_purchaseService.addPurchase(purchase);
    }

    @DeleteMapping("purchase/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_purchaseService.deletePurchaseById(id);
    }
} 