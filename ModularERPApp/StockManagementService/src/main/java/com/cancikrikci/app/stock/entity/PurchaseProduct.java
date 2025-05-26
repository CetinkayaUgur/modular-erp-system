package com.cancikrikci.app.stock.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "purchase_products")
public class PurchaseProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "purchase_id", nullable = false)
    public int purchaseId;

    @Column(name = "product_id")
    public Integer productId;

    @Column(name = "quantity", nullable = false)
    public int quantity;

    @Column(name = "unit_price", nullable = false)
    public BigDecimal unitPrice;

    @Column(name = "subtotal", nullable = false)
    public BigDecimal subtotal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_id", insertable = false, updatable = false)
    @JsonIgnore
    public Purchase purchase;
} 