package com.cancikrikci.app.order.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    public int id;
    @Column(name = "order_date", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate orderDate = LocalDate.now();

    @Column(name = "total_amount")
    public BigDecimal totalAmount;

    @Column(name = "status", length = 50)
    public String status;

    @Column(name = "description")
    public String description;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "order_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "product_id", nullable = false)
    )
    @JsonIgnore
    public List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    public Customer customer;

} 