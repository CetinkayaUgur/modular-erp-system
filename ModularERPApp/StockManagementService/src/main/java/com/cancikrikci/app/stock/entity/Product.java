package com.cancikrikci.app.stock.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    public int id;

    @Column(name = "name")
    public String name;
    @Column(name = "description")
    public String description;

    @Column(name = "unit", length = 50)
    public String unit;

    @Column(name = "stock_quantity", nullable = false)
    public int stockQuantity;

    @Column(name = "unit_price", nullable = false)
    public BigDecimal unitPrice;

    @Column(name = "is_active")
    public boolean isActive;

    @Column(name = "added_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate addedDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    public ProductCategory category;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "purchase_products",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "product_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "purchase_id", referencedColumnName = "purchase_id", nullable = false)
    )
    @JsonIgnore
    public List<Purchase> purchases;
} 