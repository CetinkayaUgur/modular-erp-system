package com.cancikrikci.app.stock.controller;

import com.cancikrikci.app.stock.entity.Product;
import com.cancikrikci.app.stock.entity.PurchaseProduct;
import com.cancikrikci.app.stock.service.ProductService;
import com.cancikrikci.app.stock.service.PurchaseProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/purchaseproducts")
public class PurchaseProductController {
    private final PurchaseProductService m_purchaseProductService;

    public PurchaseProductController(PurchaseProductService purchaseProductService)
    {
        m_purchaseProductService = purchaseProductService;
    }

    @GetMapping
    public List<PurchaseProduct> getAll()
    {
        return m_purchaseProductService.getAllPurchaseProducts();
    }

    @GetMapping("purchaseproduct/{id}")
    public PurchaseProduct findById(@PathVariable(name = "id") int id)
    {
        return m_purchaseProductService.findPurchaseProductById(id);
    }
    @PostMapping("purchaseproduct/save")
    public PurchaseProduct save(@RequestBody PurchaseProduct purchaseProduct)
    {
        return m_purchaseProductService.addPurchaseProduct(purchaseProduct);
    }

    @DeleteMapping("purchaseproduct/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_purchaseProductService.deletePurchaseProductById(id);
    }
} 