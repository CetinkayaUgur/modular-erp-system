package com.cancikrikci.app.order.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.context.annotation.Lazy;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    public int id;

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
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate addedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    public ProductCategory category;

    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    public List<Order> orders;
} 