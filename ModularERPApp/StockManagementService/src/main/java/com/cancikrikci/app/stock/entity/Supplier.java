package com.cancikrikci.app.stock.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate registrationDate;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    public List<Purchase> products;
} 