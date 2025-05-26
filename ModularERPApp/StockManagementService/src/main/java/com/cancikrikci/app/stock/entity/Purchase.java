package com.cancikrikci.app.stock.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "purchases")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_id")
    public int id;

    @Column(name = "supplier_id")
    public Integer supplierId;

    @Column(name = "purchase_date", nullable = false)
    public LocalDate purchaseDate;

    @Column(name = "total_amount")
    public BigDecimal totalAmount;

    @Column(name = "description")
    public String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<PurchaseProduct> products;
} 