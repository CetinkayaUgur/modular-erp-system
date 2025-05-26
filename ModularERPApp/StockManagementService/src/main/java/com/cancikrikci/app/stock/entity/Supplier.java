package com.cancikrikci.app.stock.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    public int id;

    @Column(name = "name", nullable = false, length = 150)
    public String name;

    @Column(name = "phone", length = 20)
    public String phone;

    @Column(name = "email", length = 100)
    public String email;

    @Column(name = "address")
    public String address;

    @Column(name = "registration_date")
    public LocalDateTime registrationDate;
} 