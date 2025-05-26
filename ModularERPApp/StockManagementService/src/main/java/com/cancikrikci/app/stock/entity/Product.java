package com.cancikrikci.app.stock.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    public int id;

    @Column(name = "category_id")
    public Integer categoryId;

    @Column(name = "name", nullable = false, length = 150)
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
    public LocalDateTime addedDate;
} 