package com.cancikrikci.app.finance.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "budget")
public class Budget {
    @Id
    @Column(name = "id")
    public boolean id = true;

    @Column(name = "total", nullable = false)
    public BigDecimal total;
}
