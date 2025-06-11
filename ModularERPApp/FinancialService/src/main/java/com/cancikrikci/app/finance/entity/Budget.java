package com.cancikrikci.app.finance.entity;

import com.cancikrikci.common.lib.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "budget")
public class Budget {
    @Id
    @Column(name = "id")
    public int id;

    @Column(name = "total", nullable = false)
    public BigDecimal total;

    @Column(name = "username")
    public String username;
}
