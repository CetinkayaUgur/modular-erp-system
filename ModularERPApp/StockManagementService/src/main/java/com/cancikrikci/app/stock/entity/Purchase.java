package com.cancikrikci.app.stock.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "purchase_date", nullable = false)
    public LocalDate purchaseDate;

    @Column(name = "total_amount")
    public BigDecimal totalAmount;

    @Column(name = "description")
    public String description;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "purchases", cascade = CascadeType.ALL)
    public List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    @JsonIgnore
    public Supplier supplier;
} 